import React from 'react'
import './Testimonials.css'
import { images } from '../CloundinaryImages/Urls'

function Testimonials() {
    const slider = React.useRef();
    let tx = 0 
const slideForward = ()=>{
    if(tx > -50){
        tx -= 25;
    }
    slider.current.style.transform = `translateX(${tx}%)`
}
const slidebackward = ()=>{
    if(tx < 0){
        tx += 25;
    }
    slider.current.style.transform = `translateX(${tx}%)`
}
  return (
    <div className='testimonials'>
        <img src={images.nextIcon} alt="Next" className='next-btn' onClick={slideForward}/>
        <img src={images.backIcon} alt="Back" className='back-btn' onClick={slidebackward}/>
        <div className="slider">
            <ul ref={slider}>
                <li>
                    <div className='slide'>
                        <div className='user-info'>
                            <img src={images.user1} alt="User 1"/>
                            <div>
                                <h3>Lana Edison</h3>
                                <span>Educity, USA</span>
                            </div>
                        </div>
                        <p>Chossing to purse my degree at Educity was one of the best decisions i've ever made. The supportive community, state-ofthe-art faclitise, and commitment to academic excllence have truly exceed my exceptions</p>
                    </div>
                </li>
                <li>
                    <div className='slide'>
                        <div className='user-info'>
                            <img src={images.user2} alt="User 1"/>
                            <div>
                                <h3>William Jackson</h3>
                                <span>Educity, USA</span>
                            </div>
                        </div>
                        <p>Chossing to purse my degree at Educity was one of the best decisions i've ever made. The supportive community, state-ofthe-art faclitise, and commitment to academic excllence have truly exceed my exceptions</p>
                    </div>
                </li>
                                <li>
                    <div className='slide'>
                        <div className='user-info'>
                            <img src={images.user3} alt="User 1"/>
                            <div>
                                <h3>Mery Alsvin</h3>
                                <span>Educity, USA</span>
                            </div>
                        </div>
                        <p>Chossing to purse my degree at Educity was one of the best decisions i've ever made. The supportive community, state-ofthe-art faclitise, and commitment to academic excllence have truly exceed my exceptions</p>
                    </div>
                </li>
                <li>
                    <div className='slide'>
                        <div className='user-info'>
                            <img src={images.user4} alt="User 1"/>
                            <div>
                                <h3>Robinson Brown </h3>
                                <span>Educity, USA</span>
                            </div>
                        </div>
                        <p>Chossing to purse my degree at Educity was one of the best decisions i've ever made. The supportive community, state-ofthe-art faclitise, and commitment to academic excllence have truly exceed my exceptions</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Testimonials