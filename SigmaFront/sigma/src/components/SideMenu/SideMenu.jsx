// SideMenu.jsx
import React, { useEffect, useRef } from 'react';
import './SideMenu.css';
import { Link } from 'react-router-dom';
import sigma2 from "../../images/sigma_2.png";

const SideMenu = ({ isOpen, toggleMenu }) => {
  const sideMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && sideMenuRef.current && !sideMenuRef.current.contains(event.target)) {
        toggleMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, toggleMenu]);

  return (
    <div ref={sideMenuRef} className={`side-menu ${isOpen ? 'open' : ''}`}>
      <ul>
        <Link id="special__link" to="/informacije" onClick={toggleMenu}>O nama</Link>
        <div className='tapered-line'></div>

        <Link id="special__link" to="/posts" onClick={toggleMenu}>Blog</Link>
        <div className='tapered-line'></div>

        <Link id="special__link" to="/problem-of-the-week" onClick={toggleMenu}>Problem nedjelje</Link>
        <div className='tapered-line'></div>

        <Link id="special__link" to="/problems" onClick={toggleMenu}>Arhiva Problema</Link>
        <div className='tapered-line'></div>

        <Link id="special__link" to="/rankings" onClick={toggleMenu}>Lista Najboljih</Link>

        <img className='side-menu__img' src={sigma2} alt="" />
        <p id='side-menu__text'>Sigma Academy</p>
      </ul>
    </div>
  );
};

export default SideMenu;
