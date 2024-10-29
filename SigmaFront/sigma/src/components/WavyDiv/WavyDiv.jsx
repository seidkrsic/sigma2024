// WavyDiv.jsx
import React from 'react';
import './WavyDiv.css';

const WavyDiv = ({ children, title }) => {
  return (
    <div className="wavy-div">
      {title && <h1 className="wavy-div__title">{title}</h1>}
      <div className="wavy-div__content">
        {children}
      </div>
    </div>
  );
};

export default WavyDiv;
