import React from 'react'
import './Campus.css'
import { images } from '../CloundinaryImages/Urls'


function Campus() {
  return (
    <div className='campus'>
        <div className="gallery">
            <img src={images.gallery1} alt="gallery" />
            <img src={images.gallery2} alt="gallery" />
            <img src={images.gallery3} alt="gallery" />
            <img src={images.gallery4} alt="gallery" />
        </div>
        <button className='btn dark-btn'>see more here <img src={images.whiteArrow} alt="" /></button>
    </div>
  )
}

export default Campus