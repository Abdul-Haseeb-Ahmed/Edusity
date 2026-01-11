import React from 'react'
import './Programs.css'
import { images } from '../CloundinaryImages/Urls'

function Programs() {
  return (
    <div className = "Programs">
        <div className="Program">
            <img src={images.program1} alt="" />
            <div className="captions">
                <img src={images.programIcon1} alt="" />
                <p>Graduation Degree</p>
            </div>
        </div>
        <div className="Program">
            <img src={images.program2} alt="" />
            <div className="captions">
                <img src={images.programIcon2} alt="" />
                <p>Master Degree</p>
            </div>
            
        </div>        
        <div className="Program">
            <img src={images.program3} alt="" />
            <div className="captions">
                <img src={images.programIcon3} alt="" />
                <p>Post Graduation</p>
            </div>
        </div>
    </div>
  )
}

export default Programs
