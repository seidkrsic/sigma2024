

// WavyDiv.jsx
import React from 'react';
import './WavyDiv.css';


const WavyDiv = ({ children, title }) => {
  return (
    <div className="wavy-div">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,128L24,112C48,96,96,64,144,64C192,64,240,96,288,133.3C336,171,384,213,432,224C480,235,528,213,576,197.3C624,181,672,171,720,186.7C768,203,816,245,864,266.7C912,288,960,288,1008,250.7C1056,213,1104,139,1152,128C1200,117,1248,171,1296,202.7C1344,235,1392,245,1416,250.7L1440,256L1440,0L1416,0C1392,0,1344,0,1296,0C1248,0,1200,0,1152,0C1104,0,1056,0,1008,0C960,0,912,0,864,0C816,0,768,0,720,0C672,0,624,0,576,0C528,0,480,0,432,0C384,0,336,0,288,0C240,0,192,0,144,0C96,0,48,0,24,0L0,0Z"></path></svg>
      {title && <h1>{title}</h1>}
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default WavyDiv;
