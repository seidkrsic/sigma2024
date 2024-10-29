import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MenuItem.css';

const MenuItem = ({ title, path, subMenu }) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleMouseEnter = () => {
    setIsSubMenuOpen(true);
    setIsActive(true);
  };

  const handleMouseLeave = () => {
    setIsSubMenuOpen(false);
    setIsActive(false);
  };

  return (
    <div
      className='MenuItem__container'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={path} className={isActive ? 'active' : ''}>{title}</Link>
      {subMenu && subMenu.length > 0 && (
        <div className={`SubMenu ${isSubMenuOpen ? 'open' : ''}`}>
          {subMenu.map((subItem, index) => (
            <Link key={index} to={subItem.path} className='SubMenuItem'>
              {subItem.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuItem;
