import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../Config/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import './Auth.css';
import { images } from '../CloundinaryImages/Urls';
import { IoArrowBackOutline } from "react-icons/io5";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    if (!formData.email || !formData.password) {
      setErrorMessage('Please fill in all fields!');
      setLoading(false);
      return;
    }

    try {
      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      
      // Set auth flag in localStorage
      localStorage.setItem('edusity_auth', 'true');
      localStorage.setItem('edusity_user', JSON.stringify({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName
      }));
      
      // Success
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        // Use navigate with replace to prevent back button issue
        navigate('/dashboard', { replace: true });
      }, 1500);
    } catch (error) {
      // Handle Firebase errors
      let message = 'An error occurred. Please try again.';
      if (error.code === 'auth/user-not-found') {
        message = 'No account found with this email!';
      } else if (error.code === 'auth/wrong-password') {
        message = 'Incorrect password!';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Invalid email address!';
      } else if (error.code === 'auth/invalid-credential') {
        message = 'Invalid email or password!';
      }
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="logo-container">
          <img 
            src={images.logo}
            alt="Logo"
          />
        </div>
        <h2>Login to Your Account</h2>
        <p className="subtitle">Welcome back to Student Portal</p>
        
        <div className="form-container">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
          />
          <button 
            onClick={handleSubmit} 
            className="submit-btn"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </div>
        
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        
        <p className="link-text">
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
        <Link to="/" className="go-back-link">
          <IoArrowBackOutline className="go-back-icon" />
          Go back to website
        </Link>
        
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="success-icon">✓</div>
            <h3>Login Successful!</h3>
            <p>Redirecting to dashboard...</p>
          </div>
        </div>
      )}
    </div>
  );
}