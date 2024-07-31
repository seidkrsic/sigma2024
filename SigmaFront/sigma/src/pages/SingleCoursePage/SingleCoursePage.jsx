import React, { useEffect, useState } from 'react';
import "./SingleCoursePage.css";
import CourseInfoCard from '../../components/CourseInfoComponent/CourseInfoCard';
import { Link, useParams } from 'react-router-dom';
import pozadina from "../../images/pozadina1.jpg"; 
import api from '../../services/api';
import TeacherPopup from '../../components/TeacherPopup/TeacherPopup';
import useScrollToTop from '../../components/useScrollToTop/useScrollToTop';
import OrangeHeader from '../../OrangeHeader/OrangeHeader';
import parse from 'html-react-parser';

const SingleCoursePage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  useScrollToTop();

  useEffect(() => {
    window.scrollTo(0,0);
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

  useEffect(() => { 
    document.querySelector(".SingleCoursePage__container").scrollTo(0, 0);
  }, []) 



  if (error) { 
    return <div className="error" style={{color: "darkRed", height: "40vh", margin: "2rem" }}>{error}</div>   
  }

  return (
    <div className='SingleCoursePage__container1'>
       <OrangeHeader text={"Kursevi"} link_url={"/kursevi"} />
       <div className='SingleCoursePage__container'>
        <img className='SingleCoursePage__container-bg' src={pozadina} alt="" />
        <CourseInfoCard course={course} /> 


        <div className='SingleCoursePage__container-right'>
          <h2>{course?.title}</h2>
          <p>{parse(String(course?.description))}</p>
          <h3>Predavači na ovom kursu</h3>
          <div className='SingleCoursePage__teachers-container'>
            {course?.instructor.map((teacher, index)=> ( 
              <div key={teacher?.id} onClick={() =>{handleTeacherClick(teacher)}} className='AboutPage__InstructorCard-circleContainer'>
                  <img className='AboutPage__InstructorCard-imgCircle' src={teacher?.image_url} alt="" />
                  <h3>{teacher?.name}</h3>
              </div> 
            ))}
          
          </div>
          
          <Link to={course?.course_url} className='SingleCoursePage__link'>Prijavi Se</Link> 
        </div>

        {selectedTeacher && <TeacherPopup teacher={selectedTeacher} onClose={closePopup} /> }
    
        </div>
    </div>
  );
}

export default SingleCoursePage;
