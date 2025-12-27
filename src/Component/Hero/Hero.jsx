import React from 'react'
import './hero.css'
import { images } from '../../Component/CloundinaryImages/Urls.js';

function hero() {
  return (
    <div className="hero container">
      <div className="hero-text">
        <h1>We Ensure better eduaction for a better world</h1>
        <p>Our cutting-edge curriculum is design to empower students with the knowledge, skills and experiences needed to excel in the dynamic field education </p>
        <button className="btn">Explore more <img src={images.darkArrow} alt="" /></button>
      </div>
    </div>
  )
}

export default hero
