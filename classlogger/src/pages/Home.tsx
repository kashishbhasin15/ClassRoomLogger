import { useNavigate } from 'react-router-dom';
// import { useTheme } from '../context/ThemeContext';
import { BookOpen, QrCode, Clock, AlertCircle, BarChart3, Settings, ArrowRight } from 'lucide-react';
import './Home.css';

export const Home = () => {
  const navigate = useNavigate();
  // const { isDark, toggleTheme } = useTheme();

  const features = [
    {
      icon: QrCode,
      title: 'QR Code Scanning',
      description: 'Quickly identify rooms using QR code scanning for fast complaint registration'
    },
    {
      icon: Clock,
      title: 'Room Availability',
      description: 'Check real-time room availability and book time slots for complaint registration'
    },
    {
      icon: AlertCircle,
      title: 'Smart Complaints',
      description: 'Categorize issues by type, urgency level, and facility location'
    },
    {
      icon: BarChart3,
      title: 'Tracking & Analytics',
      description: 'Monitor complaint status and view detailed logs of all submissions'
    },
    {
      icon: Settings,
      title: 'Admin Dashboard',
      description: 'Manage complaints, update statuses, and track institutional maintenance'
    },
    {
      icon: BookOpen,
      title: 'Multi-Role Support',
      description: 'Dedicated portals for students, teachers, and administrators'
    }
  ];

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-content">
          <div className="logo-section">
            <BookOpen size={40} className="logo-icon" />
            <h1 className="logo-text">Classroom Logger</h1>
          </div>
          {/* <button className="theme-btn" onClick={toggleTheme}>
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button> */}
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-content">
          <h2 className="hero-title">Streamline Your Facility Management</h2>
          <p className="hero-subtitle">
            Report and track classroom and facility issues with ease. Using QR codes, real-time room availability, and intelligent categorization to keep your campus running smoothly.
          </p>

          <div className="hero-buttons">
            <button
              className="btn btn-primary"
              onClick={() => navigate('/signup')}
            >
              Get Started
              <ArrowRight size={20} />
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => navigate('/login')}
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="section-header">
          <h2>Powerful Features</h2>
          <p>Everything you need to manage classroom and facility complaints efficiently</p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  <Icon size={32} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="highlights-section">
        <div className="highlights-grid">
          <div className="highlight-card">
            <div className="highlight-number">1000+</div>
            <p>Complaints Resolved</p>
          </div>
          <div className="highlight-card">
            <div className="highlight-number">50+</div>
            <p>Institutions</p>
          </div>
          <div className="highlight-card">
            <div className="highlight-number">24/7</div>
            <p>Support Available</p>
          </div>
          <div className="highlight-card">
            <div className="highlight-number">99%</div>
            <p>Uptime Guaranteed</p>
          </div>
        </div>
      </section>

      <section className="use-cases-section">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>Simple steps to report and track facility issues</p>
        </div>

        <div className="use-cases-grid">
          <div className="use-case-card">
            <div className="step-number">1</div>
            <h3>Scan or Select</h3>
            <p>Use QR code to identify the room or manually select from availability list</p>
          </div>
          <div className="use-case-card">
            <div className="step-number">2</div>
            <h3>Report Issue</h3>
            <p>Describe the problem, select urgency level, and provide relevant details</p>
          </div>
          <div className="use-case-card">
            <div className="step-number">3</div>
            <h3>Submit & Track</h3>
            <p>Submit your complaint and monitor status in real-time through the dashboard</p>
          </div>
          <div className="use-case-card">
            <div className="step-number">4</div>
            <h3>Resolution</h3>
            <p>Admin team resolves issues and updates status. You receive notifications</p>
          </div>
        </div>
      </section>

      <section className="roles-section">
        <div className="section-header">
          <h2>For Everyone</h2>
          <p>Tailored experiences for different user roles</p>
        </div>

        <div className="roles-grid">
          <div className="role-card">
            <div className="role-icon" style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}>
              <BookOpen size={32} />
            </div>
            <h3>Students</h3>
            <ul className="role-features">
              <li>Report classroom issues</li>
              <li>Track complaint status</li>
              <li>View room availability</li>
              <li>Access complaint history</li>
            </ul>
          </div>

          <div className="role-card">
            <div className="role-icon" style={{ background: 'linear-gradient(135deg, #f093fb, #f5576c)' }}>
              <Settings size={32} />
            </div>
            <h3>Teachers</h3>
            <ul className="role-features">
              <li>Report facility problems</li>
              <li>Manage classroom resources</li>
              <li>Priority complaint handling</li>
              <li>Detailed issue documentation</li>
            </ul>
          </div>

          <div className="role-card">
            <div className="role-icon" style={{ background: 'linear-gradient(135deg, #4facfe, #00f2fe)' }}>
              <AlertCircle size={32} />
            </div>
            <h3>Administrators</h3>
            <ul className="role-features">
              <li>Manage all complaints</li>
              <li>Update issue statuses</li>
              <li>Generate reports</li>
              <li>System configuration</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Improve Your Campus Experience?</h2>
        <p>Join hundreds of institutions already using Classroom Logger</p>
        <button
          className="btn btn-primary btn-lg"
          onClick={() => navigate('/signup')}
        >
          Start Free Trial
          <ArrowRight size={20} />
        </button>
      </section>

      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Classroom Logger</h4>
            <p>Revolutionizing facility management for educational institutions</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#" onClick={() => navigate('/login')}>Login</a></li>
              <li><a href="#" onClick={() => navigate('/signup')}>Sign Up</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Classroom Logger. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
