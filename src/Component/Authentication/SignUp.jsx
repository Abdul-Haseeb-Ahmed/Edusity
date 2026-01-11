import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../Config/firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import './auth.css';
import { images } from '../CloundinaryImages/Urls';
import { IoArrowBackOutline } from "react-icons/io5";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match!');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long!');
      setLoading(false);
      return;
    }

    try {
      // Create user in Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      
      // Update user profile with name
      await updateProfile(userCredential.user, {
        displayName: formData.name
      });

      // Success
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        // Use navigate with replace
        navigate('/signin', { replace: true });
      }, 1500);
    } catch (error) {
      // Handle Firebase errors
      let message = 'An error occurred. Please try again.';
      if (error.code === 'auth/email-already-in-use') {
        message = 'This email is already registered!';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Invalid email address!';
      } else if (error.code === 'auth/weak-password') {
        message = 'Password is too weak!';
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
        <h2>Create Your Account</h2>
        <p className="subtitle">Join Edusity Student Portal</p>
        
        <div className="form-container">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={loading}
          />
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            disabled={loading}
          />
          <button 
            onClick={handleSubmit} 
            className="submit-btn"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </div>
        
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        
        <p className="link-text">
          Already have an account? <a href="/signin">Sign in here</a>
        </p>
        <a href="/" className="go-back-link">
          <IoArrowBackOutline className="go-back-icon" />
          Go back to website
        </a>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="success-icon">✓</div>
            <h3>Account Created Successfully!</h3>
            <p>Redirecting to sign in...</p>
          </div>
        </div>
      )}
    </div>
  );
}