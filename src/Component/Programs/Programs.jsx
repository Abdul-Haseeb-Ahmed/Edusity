import React from 'react'
import './Programs.css'
import { images } from '../CloundinaryImages/Urls'

function Programs() {
  return (
    <div className = "Programs">
        <div className="Program">
            <img src={images.Program_1} alt="" />
            <div className="captions">
                <img src={images.Program_icon_1} alt="" />
                <p>Graduation Degree</p>
            </div>
        </div>
        <div className="Program">
            <img src={images.Program_2} alt="" />
            <div className="captions">
                <img src={images.Program_icon_2} alt="" />
                <p>Master Degree</p>
            </div>
            
        </div>        
        <div className="Program">
            <img src={images.Program_3} alt="" />
            <div className="captions">
                <img src={images.Program_icon_3} alt="" />
                <p>Post Graduation</p>
            </div>
        </div>
    </div>
  )
}

export default Programs
