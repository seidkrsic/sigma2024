import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

import sigma2 from "../../images/sigma_2.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <img src={sigma2} alt="Sigma Akademija" className="footer-logo" />
          <h4 className='sigma__text'>Sigma Akademija</h4>
        </div>

        <div className="footer-section">
          <h4>O NAMA</h4>
          <ul>
            <li><Link to="/informacije">Osnivači</Link></li>
            <li><Link to="/informacije">Predavači</Link></li>
            <li><Link to="/informacije">Naši Prijatelji</Link></li>
            <li><Link to="" onClick={() => window.location.href = `tel: +38268619730}`}>Kontakt</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>ISTRAŽITE</h4>
          <ul>
            <li><Link to="/posts">Blog</Link></li>
            <li><Link to="/problem-of-the-week">Problem Nedjelje</Link></li>
            <li><Link to="/problems">Arhiva Problema</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>PRATITE NAS</h4>
          <a href="https://www.instagram.com/sigma_academy_mne/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Seid Kršić</p>
      </div>
    </footer>
  );
};

export default Footer;
