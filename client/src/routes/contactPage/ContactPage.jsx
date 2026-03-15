import React from 'react';
import './contactPage.scss';

function ContactPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <div className='contactPage'>
      <div className="textContainer">
        <div className="wrapper">
          <h1 className='title'>Contact Us</h1>
          <p>Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
          
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email Address" required />
            <input type="text" placeholder="Subject" required />
            <textarea placeholder="Your Message" required></textarea>
            <button type="submit">Send Message</button>
          </form>

          <div className="contactInfo">
            <div className="item">
              <span>📍</span> 123 Real Estate Ave, Suite 456, City, Country
            </div>
            <div className="item">
              <span>📞</span> +1 (234) 567-890
            </div>
            <div className="item">
              <span>📧</span> support@nestquest.com
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="Contact Us" />
      </div>
    </div>
  );
}

export default ContactPage;
