import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from '../../Config/firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import './Auth.css';
import { images } from '../CloundinaryImages/Urls';
import { IoArrowBackOutline } from "react-icons/io5";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollNumber: '',
    password: '',
    confirmPassword: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'rollNumber' ? value.toUpperCase() : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    // Validation
    if (!formData.name || !formData.email || !formData.rollNumber || !formData.password || !formData.confirmPassword) {
      setErrorMessage('Please fill in all fields!');
      setLoading(false);
      return;
    }

    if (formData.rollNumber.length < 5) {
      setErrorMessage('Roll number must be at least 5 characters!');
      setLoading(false);
      return;
    }

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
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      
      // Update user profile with name
      await updateProfile(userCredential.user, {
        displayName: formData.name
      });

      // Save to Firestore in background (non-blocking)
      setDoc(doc(db, 'users', userCredential.user.uid), {
        uid: userCredential.user.uid,
        name: formData.name,
        email: formData.email,
        rollNumber: formData.rollNumber.toUpperCase(),
        createdAt: new Date().toISOString(),
        department: 'Not Set',
        faculty: 'Not Set',
        batch: 'Not Set',
        enrolment: 'Not Set'
      }).catch(err => console.log('Firestore save error (non-critical):', err));

      // Show success immediately
      setLoading(false);
      setShowModal(true);
      
      // Redirect after 1.5 seconds
      setTimeout(() => {
        setShowModal(false);
        navigate('/signin', { replace: true });
      }, 1500);

    } catch (error) {
      setLoading(false);
      
      let message = 'An error occurred. Please try again.';
      if (error.code === 'auth/email-already-in-use') {
        message = 'This email is already registered!';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Invalid email address!';
      } else if (error.code === 'auth/weak-password') {
        message = 'Password is too weak!';
      }
      setErrorMessage(message);
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
        
        <form onSubmit={handleSubmit} className="form-container">
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
            type="text"
            name="rollNumber"
            placeholder="Roll No. (e.g: 2023F-BCS-041)"
            value={formData.rollNumber}
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
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        
        <p className="link-text">
          Already have an account? <Link to="/signin">Sign in here</Link>
        </p>
        <Link to="/" className="go-back-link">
          <IoArrowBackOutline className="go-back-icon" />
          Go back to website
        </Link>
      </div>

      {showModal && (
        <div className="modal-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          animation: 'fadeIn 0.3s ease'
        }}>
          <div className="modal-content" style={{
            background: 'white',
            padding: '40px',
            borderRadius: '16px',
            textAlign: 'center',
            boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
            animation: 'slideUp 0.3s ease'
          }}>
            <div className="success-icon" style={{
              width: '70px',
              height: '70px',
              background: '#10b981',
              color: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px',
              margin: '0 auto 20px',
              fontWeight: 'bold'
            }}>✓</div>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: '10px' }}>
              Account Created Successfully! 🎉
            </h3>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>Redirecting to sign in...</p>
          </div>
        </div>
      )}
    </div>
  );
}