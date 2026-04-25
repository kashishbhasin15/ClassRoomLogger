


import { useEffect, useState } from 'react';
import API from "../api/api"; // ✅ use API instance
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';
import './Logs.css';

export const Logs = () => {
  const [complaints, setComplaints] = useState<any[]>([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        // ✅ FIXED ENDPOINT
        const res = await API.get("/complaints/my");

        console.log("USER COMPLAINTS:", res.data); 

        setComplaints(res.data);
      } catch (err) {
        console.error("FETCH ERROR:", err);
      }
    };

    fetchComplaints();
  }, []);

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'in_progress':
        return 'status-progress';
      case 'resolved':
        return 'status-resolved';
      default:
        return '';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in_progress':
        return 'In Progress';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  return (
    <div className="logs-layout">
      <Sidebar />
      <div className="logs-main">
        <Navbar />
        <div className="logs-content">
          <h2 className="page-title">My Complaint Logs</h2>

          <div className="logs-card">
            <div className="table-wrapper">
              <table className="logs-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Room</th>
                    <th>Building</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {complaints.map((c) => (
                    <tr key={c._id}>
                      <td>#{c._id?.slice(-4)}</td>
                      <td>{c.roomNumber}</td>
                      <td>{c.buildingName}</td>
                      <td>
                        {c.createdAt
                          ? new Date(c.createdAt).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td>
                        <span className={`status-badge ${getStatusClass(c.status)}`}>
                          {getStatusText(c.status)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>

              {complaints.length === 0 && (
                <p style={{ textAlign: "center" }}>No complaints found</p>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
