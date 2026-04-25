



import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Navbar } from "../components/Navbar";
import API from "../api/api";
import './Logs.css'; // ✅ Use the same CSS as the Logs page

export const MyRoomRequests = () => {
  const [data, setData] = useState<any[]>([]);

  const fetch = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/bookings/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  // ✅ Helper to match the Logs.tsx status badge style
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'approved':
        return 'status-resolved'; // Match green color
      case 'rejected':
        return 'status-pending'; // Match reddish/yellow or custom
      default:
        return '';
    }
  };

  return (
    <div className="logs-layout"> {/* ✅ Layout class from Logs.tsx */}
      <Sidebar />
      <div className="logs-main">
        <Navbar />
        <div className="logs-content">
          <h2 className="page-title">My Room Requests</h2>

          <div className="logs-card">
            <div className="table-wrapper">
              <table className="logs-table"> {/* ✅ Table class from Logs.tsx */}
                <thead>
                  <tr>
                    <th>Room</th>
                    <th>Building</th>
                    <th>Date</th>
                    <th>Time Slot</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((r) => (
                    <tr key={r._id}>
                      <td style={{ fontWeight: 600 }}>{r.roomNumber}</td>
                      <td>{r.buildingName}</td>
                      <td>{r.date}</td>
                      <td>{r.timeSlot}</td>
                      <td>
                        <span className={`status-badge ${getStatusClass(r.status)}`}>
                          {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {data.length === 0 && (
                <p style={{ textAlign: "center", padding: "20px" }}>No requests found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};