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
            <li><strong>Problem Nedjelje:</strong> Svake sedmice vas očekuje novi matematički izazov za rješavanje.</li>
            <li><strong>Blog:</strong> Uživajte u našim inspirativnim člancima o matematici i nauci.</li>
            <li><strong>Pravila Igre – Problem Nedjelje:</strong>
                <ul>
                <li>Poštena igra je ključna! Svaki pokušaj varanja rezultiraće diskvalifikacijom.</li>
                <li>Ako dva ili više takmičara imaju isti broj poena, prednost ima onaj koji je problem riješio brže.</li>
                <li>Vrijeme za rješavanje počinje od trenutka kada prvi put otvorite problem i završava se slanjem vašeg rješenja.</li> 
                <li>Za najbolje učesnike pripremili smo nagrade koje dodjeljujemo jednom mjesečno. Redovno provjeravajte svoj email.</li>
                </ul>
            </li>
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
