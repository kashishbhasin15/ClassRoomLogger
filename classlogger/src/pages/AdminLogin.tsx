// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { Shield } from 'lucide-react';
// import './AdminLogin.css';

// export const AdminLogin = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await login(email, password, 'admin');
//     navigate('/admin-dashboard');
//   };

//   return (
//     <div className="admin-login-container">
//       <div className="admin-login-card">
//         <div className="admin-login-header">
//           <Shield size={48} className="admin-icon" />
//           <h1>Classroom Logger</h1>
//           <p>Admin Portal</p>
//         </div>

//         <form onSubmit={handleSubmit} className="admin-login-form">
//           <div className="admin-form-group">
//             <label htmlFor="email">Admin Email</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter admin email"
//               required
//             />
//           </div>

//           <div className="admin-form-group">
//             <label htmlFor="password">Admin Password</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter admin password"
//               required
//             />
//           </div>

//           <button type="submit" className="admin-login-button">
//             Login as Admin
//           </button>
//         </form>

//         <div className="admin-login-footer">
//           <Link to="/login">Login as Student/Teacher</Link>
//         </div>
//       </div>
//     </div>
//   );
// };




import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { useAuth } from "../context/AuthContext";
import './AdminLogin.css';
import API from "../api/api";

export const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
const { setUser } = useAuth();
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   try {
  //     const res = await API.post("/auth/admin-login", {
  //       email,
  //       password,
  //     });

  //     // store token + role
  //     localStorage.setItem("token", res.data.token);
  //     localStorage.setItem("role", "admin");

  //     navigate("/admin-dashboard");

  //   } catch (err: any) {
  //     alert(err.response?.data?.msg || "Admin login failed");
  //     console.error(err);
  //   }
  // };
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await API.post("/auth/admin-login", {
      email,
      password,
    });

    // ✅ Create admin user
    const adminUser = {
      name: "Admin",
      email: email,
      role: "admin" as "admin", // 🔥 FIX TYPE
    };

    // ✅ Store data
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", "admin");
    localStorage.setItem("user", JSON.stringify(adminUser));

    // 🔥 UPDATE CONTEXT (MOST IMPORTANT)
    setUser(adminUser);

    // ✅ Navigate
    navigate("/admin-dashboard");

  } catch (err: any) {
    alert(err.response?.data?.msg || "Admin login failed");
  }
};

//   const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();

//   try {
//     const res = await API.post("/auth/admin-login", {
//       email,
//       password,
//     });

//     // ✅ STORE EVERYTHING (IMPORTANT)
//     localStorage.setItem("token", res.data.token);
//     localStorage.setItem("role", "admin");

//     // 🔥 ADD THIS (missing in your code)
//     localStorage.setItem(
//       "user",
//       JSON.stringify({
//         name: "Admin",
//         email: email,
//         role: "admin",
//       })
//     );

//     navigate("/admin-dashboard");

//   } catch (err: any) {
//     alert(err.response?.data?.msg || "Admin login failed");
//   }
// };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <Shield size={48} className="admin-icon" />
          <h1>Classroom Logger</h1>
          <p>Admin Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-form-group">
            <label>Admin Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter admin email"
              required
            />
          </div>

          <div className="admin-form-group">
            <label>Admin Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              required
            />
          </div>

          <button type="submit" className="admin-login-button">
            Login as Admin
          </button>
        </form>

        <div className="admin-login-footer">
          <Link to="/login">Login as Student/Teacher</Link>
        </div>
      </div>
    </div>
  );
};