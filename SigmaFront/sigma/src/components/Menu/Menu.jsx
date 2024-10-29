import React, { useContext, useEffect } from 'react'
import "./Menu.css" 
import MenuItem from '../MenuItem/MenuItem' 
import AuthContext from '../AuthContext/AuthContext'


const Menu = ({menuItems}) => {
  const {scrolled} = useContext(AuthContext);

  return (
    <div className={ scrolled ? "Menu__container menu-active" : 'Menu__container'}>
        {menuItems.map((item, index) => (
            <MenuItem key={index} title={item.name} path={item.path} subMenu={item.subMenu} />
        ))}
    </div>
  )
}

export default Menu