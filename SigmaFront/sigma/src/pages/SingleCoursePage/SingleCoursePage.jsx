import React, { useEffect, useState } from 'react';
import "./SingleCoursePage.css";
import CourseInfoCard from '../../components/CourseInfoComponent/CourseInfoCard';
import { Link, useParams } from 'react-router-dom';
import pozadina from "../../images/pozadina.webp";
import api from '../../services/api';
import TeacherPopup from '../../components/TeacherPopup/TeacherPopup';

const SingleCoursePage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  useEffect(() => {
    window.scrollTo(0,0)
    const fetchCourse = async () => {
      try {
        const response = await api.getCourse(id);
        setCourse(response);
        setSelectedTeacher(null);
      } catch (err) {
        setError('Failed to fetch course');
      }
    };

    fetchCourse();
  }, [id]); 

  const handleTeacherClick = (teacher) => {
    setSelectedTeacher(teacher);
  };

  const closePopup = () => {
    setSelectedTeacher(null);
  };



  if (error) { 
    return <div className="error" style={{color: "darkRed", height: "40vh", margin: "2rem" }}>{error}</div>   
  }

  return (
    <div className='SingleCoursePage__container'>
      <img className='SingleCoursePage__container-bg' src={pozadina} alt="" />
      <CourseInfoCard course={course} /> 

      <div className='SingleCoursePage__container-right'>
        <h2>{course?.title}</h2>
        <p>{course?.description}</p>
        <h3>Predavač na ovom kursu</h3>
        <div onClick={() =>{handleTeacherClick(course?.instructor)}} className='AboutPage__InstructorCard-circleContainer'>
            <img className='AboutPage__InstructorCard-imgCircle' src={course?.instructor.image_url} alt="" />
            <h3>{course?.instructor.name}</h3>
        </div> 
        <Link to="https://www.google.com" className='SingleCoursePage__link'>Prijavi Se</Link> 
      </div>

      {selectedTeacher && <TeacherPopup teacher={selectedTeacher} onClose={closePopup} /> }
  
      
    </div>
  );
}

export default SingleCoursePage;
