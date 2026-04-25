
import { useEffect, useState } from "react";
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';
import { FileText, Clock, CheckCircle, XCircle, BarChart3 } from 'lucide-react';
import API from "../api/api";
import './Dashboard.css';

export const Dashboard = () => {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);

  // ================= FETCH COMPLAINTS =================
  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/complaints/my", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("COMPLAINTS:", res.data); // DEBUG

      setComplaints(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= FETCH BOOKINGS =================
  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/bookings/my", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("BOOKINGS:", res.data); // DEBUG

      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchComplaints();
    fetchBookings();
  }, []);

  // ================= COUNTS =================
  const pendingComplaints = complaints.filter(c => c.status === "pending").length;
  const progressComplaints = complaints.filter(c => c.status === "in_progress").length;
  const resolvedComplaints = complaints.filter(c => c.status === "resolved").length;

  const pendingBookings = bookings.filter(b => b.status === "pending").length;
  const acceptedBookings = bookings.filter(b => b.status === "approved").length;
  const rejectedBookings = bookings.filter(b => b.status === "rejected").length;

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <Navbar />

        <div className="dashboard-content">

          <div className="dashboard-header-flex">
            <h2 className="page-title">Dashboard Overview</h2>
            <div className="live-indicator">
              <span className="dot"></span> Live Statistics
            </div>
          </div>

          {/* ================= COMPLAINTS ================= */}
          <div className="section-container">
            <div className="section-header">
              <BarChart3 size={20} className="text-blue" />
              <h3>Complaints Summary</h3>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon-wrapper pending">
                  <Clock size={24} />
                </div>
                <div className="stat-info">
                  <p className="stat-label">Pending</p>
                  <p className="stat-number">{pendingComplaints}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon-wrapper progress">
                  <FileText size={24} />
                </div>
                <div className="stat-info">
                  <p className="stat-label">In Progress</p>
                  <p className="stat-number">{progressComplaints}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon-wrapper resolved">
                  <CheckCircle size={24} />
                </div>
                <div className="stat-info">
                  <p className="stat-label">Resolved</p>
                  <p className="stat-number">{resolvedComplaints}</p>
                </div>
              </div>
            </div>
          </div>

          {/* ================= BOOKINGS ================= */}
          <div className="section-container">
            <div className="section-header">
              <BarChart3 size={20} className="text-purple" />
              <h3>Room Request Summary</h3>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon-wrapper pending">
                  <Clock size={24} />
                </div>
                <div className="stat-info">
                  <p className="stat-label">Pending</p>
                  <p className="stat-number">{pendingBookings}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon-wrapper resolved">
                  <CheckCircle size={24} />
                </div>
                <div className="stat-info">
                  <p className="stat-label">Accepted</p>
                  <p className="stat-number">{acceptedBookings}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon-wrapper rejected">
                  <XCircle size={24} />
                </div>
                <div className="stat-info">
                  <p className="stat-label">Rejected</p>
                  <p className="stat-number">{rejectedBookings}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};