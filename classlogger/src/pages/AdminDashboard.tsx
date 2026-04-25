// // import { useState } from 'react';
// // import { Sidebar } from '../components/Sidebar';
// // import { Navbar } from '../components/Navbar';
// // import { Filter } from 'lucide-react';
// // import './AdminDashboard.css';

// // export const AdminDashboard = () => {
// //   const [filter, setFilter] = useState('all');

// //   const complaints = [
// //     { id: '1234', title: 'Broken projector', student: 'John Doe', location: 'Room 101', date: '2024-03-15', status: 'pending' },
// //     { id: '1233', title: 'AC not working', student: 'Jane Smith', location: 'Room 205', date: '2024-03-14', status: 'in_progress' },
// //     { id: '1232', title: 'Whiteboard markers needed', student: 'Mike Johnson', location: 'Room 303', date: '2024-03-13', status: 'resolved' },
// //     { id: '1231', title: 'Faulty microphone', student: 'Sarah Williams', location: 'Auditorium', date: '2024-03-12', status: 'pending' },
// //     { id: '1230', title: 'Internet connectivity issue', student: 'Tom Brown', location: 'Computer Lab', date: '2024-03-11', status: 'in_progress' },
// //   ];

// //   const handleStatusChange = (id: string, newStatus: string) => {
// //     console.log(`Changing status of complaint ${id} to ${newStatus}`);
// //   };

// //   return (
// //     <div className="admin-dashboard-layout">
// //       <Sidebar />
// //       <div className="admin-dashboard-main">
// //         <Navbar />
// //         <div className="admin-dashboard-content">
// //           <div className="admin-header">
// //             <h2 className="page-title">All Complaints</h2>
// //             <div className="filter-section">
// //               <Filter size={20} />
// //               <select value={filter} onChange={(e) => setFilter(e.target.value)} className="filter-select">
// //                 <option value="all">All Status</option>
// //                 <option value="pending">Pending</option>
// //                 <option value="in_progress">In Progress</option>
// //                 <option value="resolved">Resolved</option>
// //               </select>
// //             </div>
// //           </div>

// //           <div className="admin-card">
// //             <div className="admin-table-wrapper">
// //               <table className="admin-table">
// //                 <thead>
// //                   <tr>
// //                     <th>ID</th>
// //                     <th>Title</th>
// //                     <th>Student</th>
// //                     <th>Location</th>
// //                     <th>Date</th>
// //                     <th>Status</th>
// //                     <th>Action</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {complaints.map((complaint) => (
// //                     <tr key={complaint.id}>
// //                       <td>#{complaint.id}</td>
// //                       <td>{complaint.title}</td>
// //                       <td>{complaint.student}</td>
// //                       <td>{complaint.location}</td>
// //                       <td>{complaint.date}</td>
// //                       <td>
// //                         <span className={`admin-status-badge status-${complaint.status}`}>
// //                           {complaint.status === 'in_progress' ? 'In Progress' : complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
// //                         </span>
// //                       </td>
// //                       <td>
// //                         <select
// //                           className="status-dropdown"
// //                           value={complaint.status}
// //                           onChange={(e) => handleStatusChange(complaint.id, e.target.value)}
// //                         >
// //                           <option value="pending">Pending</option>
// //                           <option value="in_progress">In Progress</option>
// //                           <option value="resolved">Resolved</option>
// //                         </select>
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };







// import { useEffect, useState } from 'react';
// import { Sidebar } from '../components/Sidebar';
// import { Navbar } from '../components/Navbar';
// import { Filter } from 'lucide-react';
// import './AdminDashboard.css';
// import API from "../api/api";
// import { ComplaintDetailModal } from '../components/ComplaintDetailedModel';

// export const AdminDashboard = () => {
//   const [filter, setFilter] = useState('all');
//   const [complaints, setComplaints] = useState<any[]>([]);
//   const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
//   const [bookings, setBookings] = useState([]);
//   // FETCH
// const fetchComplaints = async () => {
//   try {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       alert("No token found. Please login again.");
//       return;
//     }

//     const res = await API.get("/admin/complaints", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     setComplaints(res.data);
//   } catch (err) {
//     console.error("Fetch complaints error:", err);
//     alert("Error fetching complaints");
//   }
// };
// const fetchBookings = async () => {
//   try {
//     const token = localStorage.getItem("token");

//     const res = await API.get("/bookings", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     setBookings(res.data);
//   } catch (err) {
//     console.error("Booking fetch error:", err);
//   }
// };
  

// useEffect(() => {
//   fetchComplaints();
//   fetchBookings(); // ✅ ADD THIS
// }, []);

//   // UPDATE STATUS
//   const handleStatusChange = async (id: string, newStatus: string) => {
//     try {
//       await API.put(`/admin/complaints/${id}`, { status: newStatus });
//       fetchComplaints();
//     } catch (err) {
//       console.error(err);
//       alert("Error updating status");
//     }
//   };

//   // DELETE
//   const handleDelete = async (id: string) => {
//     try {
//       await API.delete(`/admin/complaints/${id}`);
//       fetchComplaints();
//     } catch (err) {
//       console.error(err);
//       alert("Error deleting complaint");
//     }
//   };

//   // FILTER
//   const filteredComplaints =
//     filter === "all"
//       ? complaints
//       : complaints.filter((c) => c.status === filter);

//   return (
//     <div className="admin-dashboard-layout">
//       <Sidebar />

//       <div className="admin-dashboard-main">
//         <Navbar />

//         <div className="admin-dashboard-content">
//           <div className="admin-header">
//             <h2 className="page-title">All Complaints</h2>

//             <div className="filter-section">
//               <Filter size={20} />
//               <select
//                 value={filter}
//                 onChange={(e) => setFilter(e.target.value)}
//                 className="filter-select"
//               >
//                 <option value="all">All Status</option>
//                 <option value="pending">Pending</option>
//                 <option value="in_progress">In Progress</option>
//                 <option value="resolved">Resolved</option>
//               </select>
//             </div>
//           </div>

//           <div className="admin-card">
//             <div className="admin-table-wrapper">
//               <table className="admin-table">
//                 <thead>
//                   <tr>
//                     <th>ID</th>
//                     <th>Title</th>        
//                     <th>Student</th>      
//                     <th>Location</th>     
//                     <th>Date</th>
//                     <th>Status</th>
//                     <th>Action</th>
//                     <th>Delete</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {filteredComplaints.map((c) => (
//                     <tr
//                       key={c._id}
//                       onClick={() => setSelectedComplaint(c)}
//                       style={{ cursor: "pointer" }}
//                     >
//                       <td>#{c._id.slice(-4)}</td>

//                       {/* ✅ TITLE */}
//                       <td>{c.complaintType || "Complaint"}</td>

//                       {/* ✅ STUDENT */}
//                       <td>{c.createdBy?.name || "User"}</td>

//                       {/* ✅ LOCATION */}
//                       <td>
//                         {c.roomNumber} - {c.buildingName}
//                       </td>

//                       <td>{new Date(c.createdAt).toLocaleDateString()}</td>

//                       <td>
//                         <span className={`admin-status-badge status-${c.status}`}>
//                           {c.status === "in_progress"
//                             ? "In Progress"
//                             : c.status.charAt(0).toUpperCase() + c.status.slice(1)}
//                         </span>
//                       </td>

//                       {/* ACTION */}
//                       <td onClick={(e) => e.stopPropagation()}>
//                         <select
//                           className="status-dropdown"
//                           value={c.status}
//                           onChange={(e) =>
//                             handleStatusChange(c._id, e.target.value)
//                           }
//                         >
//                           <option value="pending">Pending</option>
//                           <option value="in_progress">In Progress</option>
//                           <option value="resolved">Resolved</option>
//                         </select>
//                       </td>

//                       {/* DELETE */}
//                       <td onClick={(e) => e.stopPropagation()}>
//                         <button
//                           onClick={() => handleDelete(c._id)}
//                           style={{ color: "red" }}
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>

//               {filteredComplaints.length === 0 && (
//                 <p style={{ textAlign: "center", marginTop: "20px" }}>
//                   No complaints found
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* MODAL */}
//       <ComplaintDetailModal
//         complaint={
//           selectedComplaint && {
//             id: selectedComplaint._id.slice(-4),
//             title: selectedComplaint.complaintType,
//             student: selectedComplaint.createdBy?.name,
//             location:
//               selectedComplaint.roomNumber +
//               " - " +
//               selectedComplaint.buildingName,
//             date: new Date(selectedComplaint.createdAt).toLocaleDateString(),
//             status: selectedComplaint.status,
//             description: selectedComplaint.description,
//             complaintType: selectedComplaint.complaintType,
//             urgency: selectedComplaint.urgency,
//             timeSlot: selectedComplaint.timeSlot,
//           }
//         }
//         onClose={() => setSelectedComplaint(null)}
//       />
//     </div>
//   );
// };





import { useEffect, useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';
import { Filter } from 'lucide-react';
import './AdminDashboard.css';
import API from "../api/api";
import { ComplaintDetailModal } from '../components/ComplaintDetailedModel';

export const AdminDashboard = () => {
  const [filter, setFilter] = useState('all');
  const [complaints, setComplaints] = useState<any[]>([]);
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);

  // ✅ KEEP BOOKINGS (now USED → no TS warning)
  // const [bookings, setBookings] = useState<any[]>([]);

  // ================= FETCH COMPLAINTS =================
  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("No token found. Please login again.");
        return;
      }

      const res = await API.get("/admin/complaints", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!token) {
  alert("No token found. Please login again.");
  return;
}

      setComplaints(res.data);
    } catch (err) {
      console.error("Fetch complaints error:", err);
      alert("Error fetching complaints");
    }
  };


  useEffect(() => {
    fetchComplaints();
    
  }, []);

  // ================= UPDATE =================
  const handleStatusChange = async (id: string, newStatus: string) => {
  try {
    const token = localStorage.getItem("token");

    await API.put(
      `/admin/complaints/${id}`,
      { status: newStatus },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!token) {
  alert("No token found. Please login again.");
  return;
}

    fetchComplaints();
  } catch (err) {
    console.error(err);
    alert("Error updating status");
  }
};

  // ================= DELETE =================
 const handleDelete = async (id: string) => {
  try {
    const token = localStorage.getItem("token");

    await API.delete(`/admin/complaints/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!token) {
  alert("No token found. Please login again.");
  return;
}

    fetchComplaints();
  } catch (err) {
    console.error(err);
    alert("Error deleting complaint");
  }
};

  // ================= FILTER =================
  const filteredComplaints =
    filter === "all"
      ? complaints
      : complaints.filter((c) => c.status === filter);

  return (
    <div className="admin-dashboard-layout">
      <Sidebar />

      <div className="admin-dashboard-main">
        <Navbar />

        <div className="admin-dashboard-content">

          {/* ================= COMPLAINTS ================= */}
          <div className="admin-header">
            <h2 className="page-title">All Complaints</h2>

            <div className="filter-section">
              <Filter size={20} />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>

          <div className="admin-card">
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Student</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                    <th>Delete</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredComplaints.map((c) => (
                    <tr
                      key={c._id}
                      onClick={() => setSelectedComplaint(c)}
                      style={{ cursor: "pointer" }}
                    >
                      <td>#{c._id.slice(-4)}</td>
                      <td>{c.complaintType || "Complaint"}</td>
                      <td>{c.createdBy?.name || "User"}</td>
                      <td>{c.roomNumber} - {c.buildingName}</td>
                      <td>{new Date(c.createdAt).toLocaleDateString()}</td>

                      <td>
                        <span className={`admin-status-badge status-${c.status}`}>
                          {c.status === "in_progress"
                            ? "In Progress"
                            : c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                        </span>
                      </td>

                      <td onClick={(e) => e.stopPropagation()}>
                        <select
                          className="status-dropdown"
                          value={c.status}
                          onChange={(e) =>
                            handleStatusChange(c._id, e.target.value)
                          }
                        >
                          <option value="pending">Pending</option>
                          <option value="in_progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                        </select>
                      </td>

                      <td onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => handleDelete(c._id)}
                          style={{ color: "red" }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredComplaints.length === 0 && (
                <p style={{ textAlign: "center", marginTop: "20px" }}>
                  No complaints found
                </p>
              )}
            </div>
          </div>

          {/* ================= BOOKINGS (NEW SECTION) ================= */}
          {/* <div className="admin-card" style={{ marginTop: "30px" }}>
            <h2 style={{ padding: "10px" }}>Room Booking Requests</h2>

            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Room</th>
                    <th>Teacher</th>
                    <th>Subject</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {bookings.map((b) => (
                    <tr key={b._id}>
                      <td>#{b._id.slice(-4)}</td>
                      <td>{b.roomNumber} ({b.buildingName})</td>
                      <td>{b.teacherName}</td>
                      <td>{b.subject}</td>
                      <td>{b.date}</td>
                      <td>{b.timeSlot}</td>
                      <td>{b.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {bookings.length === 0 && (
                <p style={{ textAlign: "center", marginTop: "20px" }}>
                  No booking requests found
                </p>
              )}
            </div>
          </div> */}

        </div>
      </div>

      {/* ================= MODAL ================= */}
      {/* <ComplaintDetailModal
        complaint={
          selectedComplaint && {
            id: selectedComplaint._id.slice(-4),
            title: selectedComplaint.complaintType,
            student: selectedComplaint.createdBy?.name,
            location:
              selectedComplaint.roomNumber +
              " - " +
              selectedComplaint.buildingName,
            date: new Date(selectedComplaint.createdAt).toLocaleDateString(),
            status: selectedComplaint.status,
            description: selectedComplaint.description,
            complaintType: selectedComplaint.complaintType,
            urgency: selectedComplaint.urgency,
            timeSlot: selectedComplaint.timeSlot,
          }
        }
        onClose={() => setSelectedComplaint(null)}
      /> */}

      <ComplaintDetailModal
        complaint={selectedComplaint}
        onClose={() => setSelectedComplaint(null)}
      />

    </div>
  );
};