



import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import './Login.css';
import API from "../api/api";

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // setLoading(true);

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", res.data);

      // ✅ Safety check
      if (!res.data || !res.data.user) {
        alert("Invalid response from server");
        return;
      }

      // ✅ Store auth
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role || res.data.user?.role);
      // localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      // ✅ Redirect
      navigate("/dashboard", { replace: true });

    } catch (err: any) {
      console.error("LOGIN ERROR:", err);

      const message =
        err.response?.data?.msg || "Invalid email or password";

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <BookOpen size={48} className="login-icon" />
          <h1>Classroom Logger</h1>
          <p>Student & Teacher Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <div className="login-footer">
          <p>
            Don't have an account? <Link to="/signup">Sign up here</Link>
          </p>
          <p>
            <Link to="/admin-login">Login as Admin</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
