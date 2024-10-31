// SideMenu.js
import React from 'react';
import './SideMenu.css';
import { Link } from 'react-router-dom';
import sigma2 from "../../images/sigma_2.png" 

const SideMenu = ({ isOpen, toggleMenu }) => {

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }, [isOpen]);
  



  return (
    <div className={`side-menu ${isOpen ? 'open' : ''}`}>
      <ul>

        {/* <div className='tapered-line'></div> */}
        
        <Link id="special__link" to="/informacije" onClick={toggleMenu}>O nama</Link>
       
        <div className='tapered-line'></div>
        
        {/* <Link id="special__link" to="/kursevi" onClick={toggleMenu}>Kursevi</Link>
        
        <div className='tapered-line'></div>   */} 

        <Link id="special__link" to="/posts" onClick={toggleMenu}>Blog</Link>
        
        <div className='tapered-line'></div> 

        <Link id="special__link" to="/problem-of-the-week" onClick={toggleMenu}>Problem nedjelje</Link>
        
        <div className='tapered-line'></div>  

        <Link id="special__link" to="/problems" onClick={toggleMenu}>Arhiva Problema</Link>
        
        <div className='tapered-line'></div> 

        <Link id="special__link" to="/rankings" onClick={toggleMenu}>Lista Najboljih</Link>
        
        {/* <div className='tapered-line'></div>  */}
        
        <img className='side-menu__img' src={sigma2} alt="" />
        <p id='side-menu__text'>Sigma Academy</p>
      </ul>
    </div>
  );
};

export default SideMenu;
