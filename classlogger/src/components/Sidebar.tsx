




import { NavLink, useNavigate } from 'react-router-dom';
import { Home, FileText, List, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import './Sidebar.css';

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // ✅ GET ROLE FROM LOCALSTORAGE
  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  // ✅ FIXED LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login", { replace: true });
  };

  return (
    <>
      <button className="hamburger-btn" onClick={toggleSidebar}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Classroom Logger</h2>
        </div>

        <nav className="sidebar-nav">

          {/* 👨‍💼 ADMIN */}
          {isAdmin ? (
            <>
              <NavLink
                to="/admin-dashboard"
                onClick={closeSidebar}
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                <Home size={20} />
                <span>All Complaints</span>
              </NavLink>

              <NavLink to="/room-requests">
                <List size={20} />
                <span>Room Requests</span>
              </NavLink>

              <NavLink to="/generate-qr">
                <List size={20} />
                <span>Generate QR</span>
              </NavLink>
            </>
          ) : (
            <>
              {/* 👨‍🎓 USER */}
              <NavLink
                to="/dashboard"
                onClick={closeSidebar}
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                <Home size={20} />
                <span>Dashboard</span>
              </NavLink>

              <NavLink
                to="/complaint"
                onClick={closeSidebar}
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                <FileText size={20} />
                <span>New Complaint</span>
              </NavLink>

              <NavLink
                to="/logs"
                onClick={closeSidebar}
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                <List size={20} />
                <span>Complaint Logs</span>
              </NavLink>

              <NavLink
                to="/my-room-requests"
                onClick={closeSidebar}
                className={({ isActive }) => isActive ? 'active' : ''}
              >
              <List size={20} />
              <span>My Room Requests</span>
              </NavLink>

            </>
          )}
        </nav>

        {/* ✅ LOGOUT BUTTON */}
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>

      {isOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}
    </>
  );
};
