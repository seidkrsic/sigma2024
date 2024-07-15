import React, { useContext, useEffect, useState } from 'react'
import "./PageList.css" 
import AuthContext from '../AuthContext/AuthContext';
import { Link } from 'react-router-dom';


const PageList = ({item, index}) => {

  const { activeIndex } = useContext(AuthContext);
  const {setActiveIndex, isPageListVisible } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    setActiveIndex(index);

  };


  return (
    <Link 
        to={item.path} 
        onClick={handleClick} 
        className={activeIndex === index ? "PageList__container activePageList" : 'PageList__container'}>
        {item.name}
    </Link>
  )
}

export default PageList