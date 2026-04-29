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

        </div>
      </div>

      <ComplaintDetailModal
        complaint={selectedComplaint}
        onClose={() => setSelectedComplaint(null)}
      />

    </div>
  );
};