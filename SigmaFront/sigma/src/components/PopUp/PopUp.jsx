// PopUp.js
import React, { useState, useEffect } from 'react';
import './PopUp.css';

const PopUp = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if the user has already seen the pop-up
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setShowModal(true);
      localStorage.setItem('hasVisited', true);
    }
  }, []);

  const handleClose = () => {
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="popup-close" onClick={handleClose}>
          &times;
        </button>
        <h2>Dobrodošli na Sigma Akademiju!</h2>
        <p>
          Ovdje možete pronaći:
        </p>
        <ul>
          <li><strong>Problem Nedjelje:</strong> Svake nedjelje objavljujemo novi matematički problem za rješavanje.</li>
          <li><strong>Blog:</strong> Čitajte zanimljive članke o matematici i nauci.</li>
          <li><strong>Rang Liste:</strong> Takmičite se sa drugim korisnicima i pratite svoj napredak.</li>
        </ul>
        <p>
          Za najbolje iskustvo, kreirajte profil i personalizujte ga dodavanjem vaše slike i imena (opcija u gornjem desnom ćošku).
        </p>
        <p>Uživajte u učenju!</p>
      </div>
    </div>
  );
};

export default PopUp;
