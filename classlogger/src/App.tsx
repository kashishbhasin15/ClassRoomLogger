import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/Login';
import { AdminLogin } from './pages/AdminLogin';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { ComplaintForm } from './pages/ComplaintForm';
import { Logs } from './pages/Logs';
import { AdminDashboard } from './pages/AdminDashboard';
import { NotFound } from './pages/NotFound';
import { Home } from './pages/Home';
import { RoomRequests } from './pages/RoomRequests';
import { MyRoomRequests } from './pages/MyRoomRequests';
import { QRGenerator } from './pages/QRGenerator';
import { Profile } from './pages/Profile';
import { PrivateRoute } from './routes/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin-login" element={<AdminLogin />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
              <ProtectedRoute allowedRoles={['student', 'teacher']}>
                <Dashboard />
              </ProtectedRoute>
              </PrivateRoute>
            }
          />

          <Route
            path="/complaint"
            element={
              <ProtectedRoute allowedRoles={['student', 'teacher']}>
                <ComplaintForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/logs"
            element={
              <ProtectedRoute allowedRoles={['student', 'teacher']}>
                <Logs />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-room-requests"
            element={
              <ProtectedRoute allowedRoles={['student', 'teacher']}>
                <MyRoomRequests />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={['student', 'teacher']}>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin-dashboard"
            element={
              // <PrivateRoute>
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
              // </PrivateRoute>
            }
          />

          <Route
            path="/room-requests"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <RoomRequests />
              </ProtectedRoute>
            }
          />

          <Route
            path="/generate-qr"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <QRGenerator />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
