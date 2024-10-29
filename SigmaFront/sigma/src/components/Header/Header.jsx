import React from 'react'
import "./Header.css" 
import sigma from "../../images/sigma.png" 
import Menu from '../Menu/Menu'
import { Link } from 'react-router-dom' 
import { useEffect, useContext, useState } from 'react' 
import AuthContext from '../AuthContext/AuthContext' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import SideMenu from '../SideMenu/SideMenu'


const Header = () => {

    const menuItems = [
        {
          name: 'Informacije',
          path: '/informacije', 
          // subMenu: [
          //   { name: 'Pregled', path: '/informacije/pregled' },
          //   { name: 'Detalji', path: '/informacije/detalji' },
          //   { name: 'Česta Pitanja', path: '/informacije/faq' }
          // ]
        },
        {
          name: 'Kursevi',
          path: '/kursevi', 
          // subMenu: [
          //   { name: 'Pregled', path: '/kursevi/pregled' },
          //   { name: 'Detalji', path: '/kursevi/detalji' },
          //   { name: 'Česta Pitanja', path: '/kursevi/faq' }
          // ]
        }
    ];
      
    const {setScrolled} = useContext(AuthContext); 
    const {user} = useContext(AuthContext); 
    const {login} = useContext(AuthContext); 
    const {logout} = useContext(AuthContext); 
    let {scrolled} = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    const handleScroll = () => {
        if ( window.scrollY > 0) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
    };
    

    useEffect(() => {
      const isDesktop = window.innerWidth > 768;
      if (isDesktop){ 
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }
    
    }, []);

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };


  return (
    
    <div className={ scrolled ? "Header__container header-Active" : 'Header__container'}>
        <div className={scrolled ? "HeaderSmall__container " : "HeaderSmall__container" }>  
        </div>

        <div className={scrolled ? 'Header__container-help header-Active' : 'Header__container-help'}>

            <div className={scrolled ? "Header__left Header__left-smallerLogo" : "Header__left"}>
              <FontAwesomeIcon icon={!isMenuOpen ? faBars : faTimes} className="Header__menu-icon" onClick={toggleMenu} />
              <Link to="/" className='Header__container-left'>
                <img className={!scrolled ? "img__not-scaled" : "img__scaled"} src={sigma} alt="" />
                <p>Sigma <span>Academy</span></p>
              </Link>

            </div>


            
            <div className={ scrolled ? 'Header__container-right Help_menu-active' : 'Header__container-right' }>
                <Link onClick={ user && logout } className={ !scrolled ? 'Header__loginBtn' : "Header__loginBtn btn-active" } to={"/login"}>{ user ? "Logout" : "Login"}</Link> 
                <Menu menuItems={menuItems} />
            </div>
           
        </div>

        <SideMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </div>
  )
}

export default Header