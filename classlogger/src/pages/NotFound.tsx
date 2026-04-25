import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import './NotFound.css';

export const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/login');
  };

  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1 className="notfound-title">404</h1>
        <h2 className="notfound-subtitle">Page Not Found</h2>
        <p className="notfound-text">
          The page you are looking for does not exist or has been moved.
        </p>
        <button onClick={handleGoHome} className="notfound-button">
          <Home size={20} />
          Go Back Home
        </button>
      </div>
    </div>
  );
};
