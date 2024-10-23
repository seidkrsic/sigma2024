// SideMenu.js
import React from 'react';
import './SideMenu.css';
import { Link } from 'react-router-dom';
import sigma2 from "../../images/sigma_2.png"; 

const SideMenu = ({ isOpen, toggleMenu }) => {
  return (
    <div className={`side-menu ${isOpen ? 'open' : ''}`}>
      <ul>
        <li>
          <Link id="special__link" to="/informacije" onClick={toggleMenu}>
            Informacije
          </Link>
        </li>
        <div className='tapered-line'></div>

        <li>
          <Link id="special__link" to="/kursevi" onClick={toggleMenu}>
            Kursevi
          </Link>
        </li>
        <div className='tapered-line'></div>

        <li>
          <Link id="special__link" to="/problem-of-the-week" onClick={toggleMenu}>
            Problem of the Week
          </Link>
        </li>
        <div className='tapered-line'></div>

        <li>
          <Link id="special__link" to="/problems" onClick={toggleMenu}>
            Arhiva problema
          </Link>
        </li>
        <div className='tapered-line'></div>

        <li>
          <Link id="special__link" to="/blog" onClick={toggleMenu}>
            Blog
          </Link>
        </li>
        <div className='tapered-line'></div>

        <li>
          <img className='side-menu__img' src={sigma2} alt="Sigma Academy Logo" />
          <p id='side-menu__text'>Sigma Academy</p>
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;
