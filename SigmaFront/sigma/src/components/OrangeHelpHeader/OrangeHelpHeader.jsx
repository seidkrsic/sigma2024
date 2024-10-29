import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import './OrangeHelpHeader.css';
import AuthContext from '../AuthContext/AuthContext';

const OrangeHelpHeader = () => {
  const { togglePageListVisibility,isPageListVisible } = useContext(AuthContext);

  return (
    <div className={'OrangeHelpHeader__container'} >
      <FontAwesomeIcon onClick={togglePageListVisibility} icon={faPlay} className={ isPageListVisible ? "play-icon" : "play-icon icon_toggle" } />
    </div>
  );
};

export default OrangeHelpHeader;
