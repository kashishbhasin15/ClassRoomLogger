



import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BookOpen, Eye, EyeOff } from 'lucide-react';
import './Signup.css';
import API from "../api/api";

export const Signup = () => {
  const [role, setRole] = useState<'student' | 'teacher'>('student');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    institutionId: '',
    department: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };



  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');

  if (formData.password !== formData.confirmPassword) {
    setError('Passwords do not match');
    return;
  }

  if (formData.password.length < 6) {
    setError('Password must be at least 6 characters');
    return;
  }

  try {
    await API.post("/auth/signup", {
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
      role: role,
      institutionId: formData.institutionId,
      department: formData.department
    });

    // ✅ DO NOT LOGIN HERE
    alert("Signup successful! Please login.");

    navigate("/login", { replace: true });

  } catch (err: any) {
    setError(err.response?.data?.msg || "Signup failed");
    console.error(err);
  }
};

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <BookOpen size={48} className="signup-icon" />
          <h1>Create Account</h1>
          <p>Join Classroom Logger</p>
        </div>

        {/* Role selector */}
        <div className="role-selector">
          <button
            type="button"
            className={`role-btn ${role === 'student' ? 'active' : ''}`}
            onClick={() => setRole('student')}
          >
            Student
          </button>

          <button
            type="button"
            className={`role-btn ${role === 'teacher' ? 'active' : ''}`}
            onClick={() => setRole('teacher')}
          >
            Teacher
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="signup-form">

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Student fields */}
          {role === 'student' && (
            <>
              <div className="form-group">
                <label>Student ID</label>
                <input
                  type="text"
                  name="institutionId"
                  value={formData.institutionId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Department</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="cse">CSE</option>
                  <option value="ece">ECE</option>
                  <option value="me">ME</option>
                </select>
              </div>
            </>
          )}

          {/* Teacher field */}
          {role === 'teacher' && (
            <div className="form-group">
              <label>Employee ID</label>
              <input
                type="text"
                name="institutionId"
                value={formData.institutionId}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {/* Password */}
          <div className="form-group">
            <label>Password</label>
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label>Confirm Password</label>
            <div className="password-input">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="signup-button">
            Create Account
          </button>
        </form>

        <div className="signup-footer">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};