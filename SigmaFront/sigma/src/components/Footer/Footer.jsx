// Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import sigma2 from "../../images/sigma_2.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo i naziv */}
        <div className="footer-section">
          <img src={sigma2} alt="Sigma Akademija" className="footer-logo" />
          <h4 className='sigma__text'>Sigma Akademija</h4>
        </div>

        {/* Sekcija "Istražite" */}
        <div className="footer-section">
          <h4>ISTRAŽITE</h4>
          <ul>
            <li><Link to="/posts">Blog</Link></li>
            <li><Link to="/problem-of-the-week">Problem Nedjelje</Link></li>
            <li><Link to="/rankings">Rang Lista</Link></li>
          </ul>
        </div>

        {/* Sekcija "O NAMA" */}
        <div className="footer-section">
          <h4>O NAMA</h4>
          <ul>
            <li><Link to="/informacije">Osnivači</Link></li>
            <li><Link to="/informacije">Predavači</Link></li>
            <li><Link to="/informacije">Kontakt</Link></li>
          </ul>
        </div>

        {/* Sekcija "PRATITE NAS" */}
        <div className="footer-section">
          <h4>PRATITE NAS</h4>
          <div className="social-icons">
            <a href="https://www.instagram.com/sigma_academy_mne/" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>

          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Seid Kršić</p>
      </div>
    </footer>
  );
};

export default Footer;
