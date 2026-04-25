
// import { useEffect, useState } from "react";
// import API from "../api/api";

// // ✅ DEFINE TYPE
// interface Booking {
//   _id: string;
//   roomNumber: string;
//   buildingName: string;
//   timeSlot: string;
//   teacherName: string;
//   subject: string;
//   reason: string;
//   status: "pending" | "approved" | "rejected";
// }

// export const RoomRequests = () => {
//   // ✅ FIX TYPE HERE
//   const [data, setData] = useState<Booking[]>([]);

//   // FETCH DATA
//   const fetch = async () => {
//     try {
//       const res = await API.get("/bookings");
//       setData(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetch();
//   }, []);

//   // ✅ FIX TYPES HERE
//   const update = async (id: string, status: Booking["status"]) => {
//     try {
//       await API.put(`/bookings/${id}`, { status });
//       fetch();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Room Requests</h2>

//       {data.map((r) => (
//         <div
//           key={r._id}
//           style={{
//             border: "1px solid #ccc",
//             padding: "10px",
//             marginBottom: "10px",
//           }}
//         >
//           <p><strong>Room:</strong> {r.roomNumber} ({r.buildingName})</p>
//           <p><strong>Time:</strong> {r.timeSlot}</p>
//           <p><strong>Teacher:</strong> {r.teacherName}</p>
//           <p><strong>Subject:</strong> {r.subject}</p>
//           <p><strong>Reason:</strong> {r.reason}</p>
//           <p><strong>Status:</strong> {r.status}</p>

//           {/* ACTION BUTTONS */}
//           {r.status === "pending" && (
//             <>
//               <button onClick={() => update(r._id, "approved")}>
//                 Approve
//               </button>

//               <button onClick={() => update(r._id, "rejected")}>
//                 Reject
//               </button>
//             </>
//           )}
//         </div>
//       ))}

//       {data.length === 0 && <p>No requests found</p>}
//     </div>
//   );
// };



// import { useEffect, useState } from "react";
// import API from "../api/api";
// import { Sidebar } from '../components/Sidebar'; // ✅ Import Sidebar
// import { Navbar } from '../components/Navbar';   // ✅ Import Navbar
// import { Filter } from 'lucide-react';           // ✅ Import Filter icon
// import "./AdminDashboard.css";

// interface Booking {
//   _id: string;
//   roomNumber: string;
//   buildingName: string;
//   timeSlot: string;
//   teacherName: string;
//   subject: string;
//   reason: string;
//   status: "pending" | "approved" | "rejected";
// }

// export const RoomRequests = () => {
//   const [data, setData] = useState<Booking[]>([]);
//   const [filter, setFilter] = useState('all'); // ✅ Added filter state

//   const fetch = async () => {
//     try {
//       const res = await API.get("/bookings");
//       setData(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetch();
//   }, []);

//   const update = async (id: string, status: Booking["status"]) => {
//     try {
//       await API.put(`/bookings/${id}`, { status });
//       fetch();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ✅ Filter logic to match the Dashboard behavior
//   const filteredData = filter === "all" 
//     ? data 
//     : data.filter(r => r.status === filter);

//   return (
//     <div className="admin-dashboard-layout"> {/* ✅ Layout Wrapper */}
//       <Sidebar /> {/* ✅ Sidebar included */}
      
//       <div className="admin-dashboard-main">
//         <Navbar /> {/* ✅ Navbar included */}
        
//         <div className="admin-dashboard-content">
//           <div className="admin-header">
//             <h2 className="page-title">Room Requests</h2>

//             {/* ✅ Filter Section added */}
//             <div className="filter-section">
//               <Filter size={20} />
//               <select
//                 value={filter}
//                 onChange={(e) => setFilter(e.target.value)}
//                 className="filter-select"
//               >
//                 <option value="all">All Status</option>
//                 <option value="pending">Pending</option>
//                 <option value="approved">Approved</option>
//                 <option value="rejected">Rejected</option>
//               </select>
//             </div>
//           </div>

//           <div className="admin-card">
//             <div className="admin-table-wrapper">
//               <table className="admin-table">
//                 <thead>
//                   <tr>
//                     <th>Room Info</th>
//                     <th>Teacher</th>
//                     <th>Subject</th>
//                     <th>Time Slot</th>
//                     <th>Reason</th>
//                     <th>Status</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredData.map((r) => (
//                     <tr key={r._id}>
//                       <td>
//                         <div style={{ fontWeight: 600, color: "#374151" }}>
//                           {r.roomNumber}
//                         </div>
//                         <div style={{ fontSize: "12px", color: "#6b7280" }}>
//                           {r.buildingName}
//                         </div>
//                       </td>
//                       <td>{r.teacherName}</td>
//                       <td>{r.subject}</td>
//                       <td>{r.timeSlot}</td>
//                       <td>{r.reason}</td>
//                       <td>
//                         <span className={`admin-status-badge status-${r.status}`}>
//                           {r.status}
//                         </span>
//                       </td>
//                       <td>
//                         {r.status === "pending" ? (
//                           <div className="action-buttons">
//                             <button
//                               className="btn-approve"
//                               onClick={() => update(r._id, "approved")}
//                             >
//                               Approve
//                             </button>
//                             <button
//                               className="btn-reject"
//                               onClick={() => update(r._id, "rejected")}
//                             >
//                               Reject
//                             </button>
//                           </div>
//                         ) : (
//                           <span style={{ fontSize: "12px", color: "#9ca3af" }}>
//                             Processed
//                           </span>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>

//               {filteredData.length === 0 && (
//                 <p style={{ textAlign: "center", padding: "40px", color: "#6b7280" }}>
//                   No requests found
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };









import { useEffect, useState } from "react";
import API from "../api/api";
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';
import { Filter } from 'lucide-react';
import "./AdminDashboard.css";
import { RoomRequestDetailModal } from "../components/RoomRequestDetailedModel";

interface Booking {
  _id: string;
  roomNumber: string;
  buildingName: string;
  timeSlot: string;
  teacherName: string;
  subject: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
}

export const RoomRequests = () => {
  const [data, setData] = useState<Booking[]>([]);
  const [filter, setFilter] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState<Booking | null>(null); 

  const fetch = async () => {
    try {
      const res = await API.get("/bookings");
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const update = async (id: string, status: Booking["status"]) => {
    try {
      await API.put(`/bookings/${id}`, { status });
      fetch();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredData =
    filter === "all"
      ? data
      : data.filter((r) => r.status === filter);

  return (
    <div className="admin-dashboard-layout">
      <Sidebar />

      <div className="admin-dashboard-main">
        <Navbar />

        <div className="admin-dashboard-content">
          <div className="admin-header">
            <h2 className="page-title">Room Requests</h2>

            <div className="filter-section">
              <Filter size={20} />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="admin-card">
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Room</th>
                    <th>Teacher</th>
                    <th>Subject</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredData.map((r) => (
                    <tr
                      key={r._id}
                      onClick={() => setSelectedRequest(r)}  // ✅ CLICK OPENS MODAL
                      style={{ cursor: "pointer" }}
                    >
                      <td>{r.roomNumber} ({r.buildingName})</td>
                      <td>{r.teacherName}</td>
                      <td>{r.subject}</td>
                      <td>{r.timeSlot}</td>

                      <td>
                        <span className={`admin-status-badge status-${r.status}`}>
                          {r.status}
                        </span>
                      </td>

                      {/* STOP PROPAGATION */}
                      <td onClick={(e) => e.stopPropagation()}>
                        {r.status === "pending" ? (
                          <>
                            <button className="btn-approve" onClick={() => update(r._id, "approved")}>
                              Approve
                            </button>
                            <button className="btn-reject" onClick={() => update(r._id, "rejected")}>
                              Reject
                            </button>
                          </>
                        ) : (
                          "Done"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredData.length === 0 && (
                <p style={{ textAlign: "center", padding: "20px" }}>
                  No requests found
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ✅ MODAL */}
      <RoomRequestDetailModal
        request={selectedRequest}
        onClose={() => setSelectedRequest(null)}
      />
    </div>
  );
};