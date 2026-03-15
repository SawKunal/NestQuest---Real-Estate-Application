import React from 'react';
import './aboutPage.scss';

function AboutPage() {
  return (
    <div className='aboutPage'>
      <div className="textContainer">
        <div className="wrapper">
          <h1 className='title'>About NestQuest</h1>
          <p>
            Welcome to NestQuest, where we turn your property dreams into reality. 
            Since our inception, we have been dedicated to providing the most 
            comprehensive and user-friendly real estate platform in the market.
          </p>
          <p>
            Our mission is simple: to connect people with their perfect homes through 
            innovative technology and exceptional service. Whether you're a first-time 
            homebuyer or a seasoned investor, we're here to guide you every step of the way.
          </p>
          
          <div className="features">
            <div className="feature">
              <div className="icon">✓</div>
              <div className="text">
                <h3>Vast Listings</h3>
                <p>Access thousands of curated properties across the country.</p>
              </div>
            </div>
            <div className="feature">
              <div className="icon">✓</div>
              <div className="text">
                <h3>Expert Support</h3>
                <p>Our team of experienced agents is always ready to help.</p>
              </div>
            </div>
            <div className="feature">
              <div className="icon">✓</div>
              <div className="text">
                <h3>Personalized Experience</h3>
                <p>Find what truly fits your lifestyle with our smart search.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="About NestQuest" />
      </div>
    </div>
  );
}

export default AboutPage;
