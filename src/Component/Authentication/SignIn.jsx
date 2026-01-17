import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from '../../Config/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
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
      const userCredential = await signInWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );

      // Set auth immediately
      localStorage.setItem('edusity_auth', 'true');
      
      // Try to fetch Firestore data with timeout
      const fetchWithTimeout = async () => {
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), 3000)
        );
        
        const firestorePromise = getDoc(doc(db, 'users', userCredential.user.uid));
        
        try {
          const userDoc = await Promise.race([firestorePromise, timeoutPromise]);
          if (userDoc.exists()) {
            return userDoc.data();
          }
        } catch (err) {
          console.log('Firestore fetch timeout or error, using Auth data');
        }
        return null;
      };

      // Fetch data in background
      fetchWithTimeout().then(userData => {
        const userDataToStore = userData ? {
          uid: userData.uid,
          email: userData.email,
          name: userData.name,
          rollNumber: userData.rollNumber,
          department: userData.department || 'Not Set',
          faculty: userData.faculty || 'Not Set',
          batch: userData.batch || 'Not Set',
          enrolment: userData.enrolment || 'Not Set'
        } : {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          name: userCredential.user.displayName || 'Student',
          rollNumber: 'N/A',
          department: 'Not Set',
          faculty: 'Not Set',
          batch: 'Not Set',
          enrolment: 'Not Set'
        };
        
        localStorage.setItem('edusity_user', JSON.stringify(userDataToStore));
      });

      // Show success immediately (don't wait for Firestore)
      setLoading(false);
      setShowModal(true);
      
      // Redirect after 1.5 seconds
      setTimeout(() => {
        setShowModal(false);
        navigate('/dashboard', { replace: true });
      }, 1500);

    } catch (error) {
      setLoading(false);
      
      let message = 'An error occurred. Please try again.';
      if (error.code === 'auth/user-not-found') {
        message = 'No account found with this email!';
      } else if (error.code === 'auth/wrong-password') {
        message = 'Incorrect password!';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Invalid email address!';
      } else if (error.code === 'auth/invalid-credential') {
        message = 'Invalid email or password!';
      } else if (error.code === 'auth/too-many-requests') {
        message = 'Too many failed attempts. Please try again later.';
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
        <h2>Login to Your Account</h2>
        <p className="subtitle">Welcome back to Student Portal</p>
        
        <form onSubmit={handleSubmit} className="form-container">
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
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        
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
              Login Successful! 🎉
            </h3>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>Redirecting to dashboard...</p>
          </div>
        </div>
      )}
    </div>
  );
}