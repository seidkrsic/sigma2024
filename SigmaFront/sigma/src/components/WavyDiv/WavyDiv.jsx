

// WavyDiv.jsx
import React from 'react';
import './WavyDiv.css';


const WavyDiv = ({ children, title }) => {
  return (
    <div className="wavy-div">
      {title && <h1>{title}</h1>}
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default WavyDiv;
