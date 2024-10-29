import React from 'react'
import "./OrangeHeader.css" 
import { Link } from 'react-router-dom';


const OrangeHeader = ({text, link_url}) => {

  return (
    <div className={'OrangeHeader__container'} >
        <Link to={link_url}><span>{""}</span>{" " + text}</Link>
    </div>
  )
}

export default OrangeHeader