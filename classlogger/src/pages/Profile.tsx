







import { useAuth } from "../context/AuthContext";
import { Sidebar } from "../components/Sidebar";
import { Navbar } from "../components/Navbar";
import { User, Mail, Shield, BadgeCheck, Building } from "lucide-react";
import "./Profile.css";

export const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="admin-dashboard-layout">
      <Sidebar />
      <div className="admin-dashboard-main">
        <Navbar />
        
        <div className="admin-dashboard-content">
          <div className="admin-header">
            <h2 className="page-title">Account Profile</h2>
          </div>

          <div className="profile-container">
            <div className="admin-card profile-card">
              <div className="profile-header">
                <div className="profile-avatar">
                  {user?.name?.charAt(0) || "U"}
                </div>
                <div className="profile-intro">
                  <h3>{user?.name}</h3>
                  <span className="profile-badge">{user?.role}</span>
                </div>
              </div>

              <div className="profile-details-grid">
                <div className="detail-item">
                  <div className="detail-icon"><User size={18} /></div>
                  <div className="detail-info">
                    <label>Full Name</label>
                    <p>{user?.name}</p>
                  </div>
                </div>

                <div className="detail-item">
                  <div className="detail-icon"><Mail size={18} /></div>
                  <div className="detail-info">
                    <label>Email Address</label>
                    <p>{user?.email}</p>
                  </div>
                </div>

                <div className="detail-item">
                  <div className="detail-icon"><BadgeCheck size={18} /></div>
                  <div className="detail-info">
                    <label>Institution ID</label>
                    <p>{user?.institutionId || "Not Available"}</p>
                  </div>
                </div>

                <div className="detail-item">
                  <div className="detail-icon"><Building size={18} /></div>
                  <div className="detail-info">
                    <label>Department</label>
                    <p>{user?.department || "Not Available"}</p>
                  </div>
                </div>

                <div className="detail-item">
                  <div className="detail-icon"><Shield size={18} /></div>
                  <div className="detail-info">
                    <label>System Role</label>
                    <p>{user?.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};