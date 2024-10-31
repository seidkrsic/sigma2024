// Header.jsx
import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../AuthContext/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import SideMenu from '../SideMenu/SideMenu';
import Menu from '../Menu/Menu';
import sigma from '../../images/sigma.png';
import './Header.css';

const Header = () => {
  const menuItems = [
    {
      name: 'O nama',
      path: '/informacije',
    },
    {
      name: 'Blog',
      path: '/posts',
    },
  ];

  const { setScrolled } = useContext(AuthContext);
  const { user, logout } = useContext(AuthContext);
  let { scrolled } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    const isDesktop = window.innerWidth > 768;
    if (isDesktop) {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && !event.target.closest('.Header__user-menu')) {
        setIsUserMenuOpen(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]);
  

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <div className={scrolled ? 'Header__container header-Active' : 'Header__container'}>
      <div className={scrolled ? 'HeaderSmall__container ' : 'HeaderSmall__container'}></div>

      <div className={scrolled ? 'Header__container-help header-Active' : 'Header__container-help'}>
        <div className={scrolled ? 'Header__left Header__left-smallerLogo' : 'Header__left'}>
          <FontAwesomeIcon
            icon={!isMenuOpen ? faBars : faTimes}
            className='Header__menu-icon'
            onClick={toggleMenu}
          />
          <Link to='/' className='Header__container-left'>
            <img className={!scrolled ? 'img__not-scaled' : 'img__scaled'} src={sigma} alt='' />
            <p>
              Sigma <span>Academy</span>
            </p>
          </Link>
        </div>

        <div className={scrolled ? 'Header__container-right Help_menu-active' : 'Header__container-right'}>
          {user ? (
            <div className='Header__user-menu'>
              <FontAwesomeIcon
                icon={faUserCircle}
                className='Header__user-icon'
                onClick={toggleUserMenu}
              />
              {isUserMenuOpen && (
                <div className='Header__user-dropdown'>
                  <Link to='/profile' onClick={() => setIsUserMenuOpen(false)}>
                    Izmeni profil
                  </Link>
                  <a
                    href='#'
                    onClick={(e) => {
                      e.preventDefault();
                      logout();
                      setIsUserMenuOpen(false);
                    }}
                  >
                    Odjava
                  </a>
                </div>
              )}
            </div>
          ) : (
            <Link
              className={!scrolled ? 'Header__loginBtn' : 'Header__loginBtn btn-active'}
              to={'/login'}
            >
              Prijava
            </Link>
          )}
          <Menu menuItems={menuItems} />
        </div>
      </div>

      <SideMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </div>
  );
};

export default Header;
