import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { Link } from 'react-scroll';
import { images } from '../CloundinaryImages/Urls'

function Navbar() {

  const[sticky, getsticky] = useState(false);
  
  useEffect(()=>{
      window.addEventListener('scroll',()=>{
        window.scrollY > 500 ? getsticky(true) : getsticky(false);
      })
  },[])

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () =>{
    menuOpen ? setMenuOpen(false) : setMenuOpen(true);
  }
  return (
    <nav className={`container ${sticky? 'dark-nav': ''} `}>
        <img src={images.logo} alt="" className="logo"/>
    <ul className={menuOpen?'': 'hide-mobile-menu'}>
        <li><Link to='hero' smooth={true} offset={0} duration={500}>Home</Link></li>
        <li><Link to='Program'smooth={true} offset={-260} duration={500}>Programs</Link></li>
        <li><Link to='about' smooth={true} offset={-150} duration={500}>About us</Link></li>
        <li><Link to='campus' smooth={true} offset={-260} duration={500}>Campus</Link></li>
        <li><Link to='testimonials' smooth={true} offset={-239} duration={500}>Testimonial</Link></li>
        <li><Link to='contact' smooth={true} offset={-210} duration={500} className="btn">Contact us</Link></li>
    </ul>
    <img src={images.menuIcon} alt="" className='menu-icon'  onClick={toggleMenu}/>
    </nav>
  )
}
export default Navbar
