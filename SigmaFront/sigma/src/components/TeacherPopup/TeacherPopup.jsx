// TeacherPopup.js
import React from 'react';
import './TeacherPopup.css';

const TeacherPopup = ({ teacher, onClose }) => {
  if (!teacher) return null;

  return (
    <div className="teacher-popup-overlay" onClick={onClose}>
      <div className="teacher-popup" onClick={(e) => e.stopPropagation()}>
        <button className="teacher-popup-close" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path d="M0 0h24v24H0z" />
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
        </button>
        <img src={teacher.image_url} alt={teacher.name} className="teacher-popup-image" />
        <div>
            <h2>{teacher.name}</h2>
            <p>{teacher.bio}</p>
        </div>

      </div>
    </div>
  );
};

export default TeacherPopup;
