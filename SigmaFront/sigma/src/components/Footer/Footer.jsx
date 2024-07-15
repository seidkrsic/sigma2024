import React from 'react';
import './Footer.css';

import sigma2 from "../../images/sigma_2.png" 

const Footer = () => {

    
  return (
    <footer className="footer">
        
        <div className="footer-container"> 

        <div className="footer-section">
            <img src={sigma2} alt="Sigma Akademija" className="footer-logo" /> 
            <h4 className='sigma__text'>Sigma Academy</h4>
        </div>

  

            <div className="footer-section">
                <h4>SIGMA KURSEVI</h4>
                <ul>
                    <li><a href="#aops-online">AoPS Online</a></li>
                    <li><a href="#beast-academy">Beast Academy</a></li>
                    <li><a href="#aops-academy">AoPS Academy</a></li>
                </ul>
            </div>

            <div className="footer-section">
                <h4>ABOUT</h4>
                <ul>
                    <li><a href="#our-team">Our Team</a></li>
                    <li><a href="#our-history">Our History</a></li>
                    <li><a href="#jobs">Jobs</a></li>
                </ul>
            </div>

            <div className="footer-section">
                <h4>SITE INFO</h4>
                <ul>
                    <li><a href="#terms">Terms</a></li>
                    <li><a href="#privacy">Privacy</a></li>
                    <li><a href="#contact">Contact Us</a></li>
                </ul>
            </div>

            <div className="footer-section">
                <h4>FOLLOW US</h4>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram"></i>
                </a>
            </div>

            {/* <div className="footer-section subscribe">
                <h4>SUBSCRIBE FOR NEWS AND UPDATES</h4>
                <form>
                    <input type="email" placeholder="Enter email" />
                    <button type="submit"><i className="fas fa-arrow-right"></i></button>
                </form>
            </div> */}
        </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Seid Kršić</p>
      </div>
    </footer>
  );
};

export default Footer;
