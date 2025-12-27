import React from 'react'
import './Contact.css'
import { images } from '../CloundinaryImages/Urls'

function Contact() {
      const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "65c0be3c-519a-456e-9655-a89b1f310a97");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };
  return (
    <div className='contact'>
        <div className='contact-col'>
            <h3>Send Us Message <img src={images.msgIcon} alt="" /></h3>
            <p>Feel free to reach out through contact from or find our contact information below. Your feedback, question and suggestions are important to us as we strive to provide exceptional sevice to our university community.</p>
            <ul>
                <li><img src={images.mailIcon} alt="" />EdusityContact@gmail. </li>
                <li><img src={images.phoneIcon} alt="" />+1 123-456-7890.</li>
                <li><img src={images.locationIcon} alt="" />77 massachusetts Ave, Cambridge, <br />MA 02139, United State.</li>
            </ul>
        </div>
        <div className='contact-col'>
            < form onSubmit={onSubmit} >
                <label>Your Name</label>
                <input type="text" name="name" placeholder='Enter your name' required/>
                
                <label>Your Email</label>
                <input type="text" name="email" placeholder='Enter your email' required/>
                
                <label>Subject</label>
                <input type="text" name="_subject" placeholder='Enter subject' required/>

                
                <label>Write you message here</label>
                <textarea type="text" name="message" rows={6} placeholder='Enter your message' required></textarea> 
                <button type='submit' className='btn dark-btn'>Submit <img src={images.whiteArrow} alt="" /></button>           
            </form>
            <span>{result}</span>
        </div>
    </div>
  )
}

export default Contact