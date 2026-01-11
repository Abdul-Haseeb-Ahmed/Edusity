import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Navbar from './Component/Navbar/Navbar'
import Hero from './Component/Hero/Hero'
import Programs from './Component/Programs/Programs'
import Title from './Component/Title/Title'
import About from './Component/About/About'
import Campus from './Component/Campus/Campus'
import Testimonials from './Component/Testimonials/Testimonials'
import Contact from './Component/Contact/Contact'
import Footer from './Component/Footer/Footer'
import VideoPlayer from './Component/VideoPlayer/VideoPlayer'
import SignIn from './Component/Authentication/SignIn'
import SignUp from './Component/Authentication/SignUp'
import Dashboard from './Component/Dashboard/Dashboard'

function App() {
  const [playState, setplayState] = useState(false)

  // Check if user is authenticated
  const isAuthenticated = () => {
    return localStorage.getItem('edusity_auth') === 'true'
  }

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/signin" replace />
    }
    return children
  }

  // Home Page Component
  const HomePage = () => (
    <>
      <Hero/>
      <div className="container">
        <Title subtitle="Our Program" title="What We offer"/>
        <Programs/>
        <About setplayState={setplayState}/>
        <Title subtitle="Gallery" title="Campus Photos"/>
        <Campus/>
        <Title subtitle="Testimonials" title="What Students Say"/>
        <Testimonials/>
        <Title subtitle="Contact Us" title="Get in touch"/>
        <Contact/>
        <Footer/>
        <VideoPlayer playState={playState} setplayState={setplayState}/>
      </div>
    </>
  )

  // Layout wrapper component
  const Layout = () => {
    const location = useLocation()
    
    // Hide Navbar and Footer on signin, signup, and dashboard pages
    const hideNavbarFooter = location.pathname === '/signin' || 
                             location.pathname === '/signup' || 
                             location.pathname === '/dashboard'
    
    return (
      <>
        {!hideNavbarFooter && <Navbar />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </>
    )
  }
  return (
    <Router>
      <div>
        <Layout />
      </div>
    </Router>
  )
}

export default App