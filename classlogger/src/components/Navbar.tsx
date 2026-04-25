
// import { useState, useRef, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import { User, ChevronDown, LogOut, Mail, Shield } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import "./Navbar.css";

// export const Navbar = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     localStorage.removeItem("user");
//     navigate("/login", { replace: true });
//   };

//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <nav className="navbar">
//       <div className="navbar-content">
//         <div className="navbar-left">
//           <h1 className="navbar-title">Welcome, {user?.role === "admin" ? "Admin" : user?.name || "User"}</h1>
//         </div>

//         <div className="navbar-actions">
//           <div 
//             className={`navbar-user ${open ? "active" : ""}`}
//             onClick={() => setOpen(!open)}
//             ref={dropdownRef}
//           >
//             <div className="user-avatar">
//               <User size={18} />
//             </div>
//             <span className="user-role">{user?.role}</span>
//             <ChevronDown size={16} className={`arrow ${open ? 'rotate' : ''}`} />

//             {open && (
//               <div className="user-dropdown">
//                 <div className="dropdown-header">
//                   <p className="d-name">{user?.name}</p>
//                   <p className="d-email"><Mail size={12} /> {user?.email}</p>
//                   <p className="d-role"><Shield size={12} /> {user?.role}</p>
//                 </div>

//                 <div className="dropdown-divider"></div>

//                 <div className="dropdown-item" onClick={() => navigate("/profile")}>
//                   <User size={16} />
//                   <span>Account Profile</span>
//                 </div>

//                 <div className="dropdown-divider"></div>

//                 {/* Cleaned up Logout Trigger */}
//                 <div className="dropdown-item logout-btn" onClick={handleLogout}>
//                   <LogOut size={16} />
//                   <span>Logout</span>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };














import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { User, ChevronDown, LogOut, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  // close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-content">

        {/* LEFT SIDE */}
        <div className="navbar-left">
          <h1 className="navbar-title">
            Welcome, {user?.role === "admin" ? "Admin" : user?.name || "User"}
          </h1>
        </div>

        {/* RIGHT SIDE */}
        <div className="navbar-actions">

          {/* ✅ ADMIN → NOTHING */}
          {user?.role === "admin" ? null : (

            /* ✅ USERS → SHOW DROPDOWN */
            <div
              className={`navbar-user ${open ? "active" : ""}`}
              onClick={() => setOpen(!open)}
              ref={dropdownRef}
            >
              <div className="user-avatar">
                <User size={18} />
              </div>

              <span className="user-role">{user?.role}</span>

              <ChevronDown
                size={16}
                className={`arrow ${open ? "rotate" : ""}`}
              />

              {open && (
                <div className="user-dropdown">
                  <div className="dropdown-header">
                    <p className="d-name">{user?.name}</p>
                    <p className="d-email">
                      <Mail size={12} /> {user?.email}
                    </p>
                  </div>

                  <div className="dropdown-divider"></div>

                  <div
                    className="dropdown-item"
                    onClick={() => navigate("/profile")}
                  >
                    Profile
                  </div>

                  <div className="dropdown-divider"></div>

                  <div
                    className="dropdown-item logout-btn"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} />
                    Logout
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </nav>
  );
};