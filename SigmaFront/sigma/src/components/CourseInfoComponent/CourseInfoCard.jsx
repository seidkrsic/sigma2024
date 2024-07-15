import React from 'react';
import './CourseInfoCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faSchool, faCalendarAlt, faClock, faCogs, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';

const CourseInfoCard = ({ course }) => {
  return (
    <div className="course-info-card">
      <img src={course?.image_url || "https://via.placeholder.com/150"} alt={course?.title} />
      <div className="course-details">
        <div className="course-detail">
          <FontAwesomeIcon icon={faChartBar} className="icon" /> <span className="label">Razred</span>
          <span className="value">{course?.grade}</span>
        </div>
        <div className="course-detail">
          <FontAwesomeIcon icon={faSchool} className="icon" /> <span className="label">Semestar</span>
          <span className="value">{course?.term}</span>
        </div>
        <div className="course-detail">
          <FontAwesomeIcon icon={faCalendarAlt} className="icon" /> <span className="label">Dužina kursa</span>
          <span className="value">{course?.length}</span>
        </div>
        <div className="course-detail">
          <FontAwesomeIcon icon={faClock} className="icon" /> <span className="label">Predavanja</span>
          <span className="value">{course?.weekly_hours}</span>
        </div>
        <div className="course-detail">
          <FontAwesomeIcon icon={faCogs} className="icon" /> <span className="label">Nivo</span>
          <span className="value">{course?.level}</span>
        </div>
        <div className="course-detail">
          <FontAwesomeIcon icon={faMoneyBillWave} className="icon" /> <span className="label">Cijena</span>
          <span className="value">{`${course?.price} EUR (${course?.price_per_hour} EUR mjesečno)`}</span>
        </div>
      </div>
    </div>
  );
};

export default CourseInfoCard;
