// SideMenu.js
import React from 'react';
import './SideMenu.css';
import { Link } from 'react-router-dom';
import sigma2 from "../../images/sigma_2.png" 

const SideMenu = ({ isOpen, toggleMenu }) => {
  return (
    <div className={`side-menu ${isOpen ? 'open' : ''}`}>
      <ul>
       
        <Link id="special__link" to="/informacije" onClick={toggleMenu}>Informacije</Link>
       
        <div className='tapered-line'></div>
        
        <Link id="special__link" to="/kursevi" onClick={toggleMenu}>Kursevi</Link>
        
        <div className='tapered-line'></div> 
        
        <img className='side-menu__img' src={sigma2} alt="" />
        <p id='side-menu__text'>Sigma Acamedy</p>
      </ul>
    </div>
  );
};

export default SideMenu;
