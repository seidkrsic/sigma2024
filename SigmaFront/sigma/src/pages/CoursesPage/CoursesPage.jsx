import React, { useState, useEffect } from 'react';
import "./CoursesPage.css";
import CourseCard from '../../components/CourseCard/CourseCard';
import pozadina from "../../images/pozadina1.jpg";
import api from '../../services/api';
import useScrollToTop from '../../components/useScrollToTop/useScrollToTop';
import OrangeHeader from '../../OrangeHeader/OrangeHeader';

const CoursesPage = () => {

  const [courses, setCourses] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    course_type: [],
    term: [],
  });
  const [error, setError] = useState('');

  useScrollToTop(); 


  useEffect(() => {
    window.scrollTo(0,0);
    const fetchCourses = async () => {
      try {
        const data = await api.getAllCourses();
        setCourses(data);
      } catch (err) {
        setError('Failed to fetch courses');
      }
    };

    fetchCourses();

  }, []); 


  




  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setSelectedFilters((prevFilters) => {
      const isAlreadySelected = prevFilters[name].includes(value);
      const newFilters = isAlreadySelected
        ? prevFilters[name].filter((filter) => filter !== value)
        : [...prevFilters[name], value];

      return { ...prevFilters, [name]: newFilters };
    });
  };

  useEffect(() => {

    const fetchFilteredCourses = async () => {
      try {
        const params = {
          course_type: selectedFilters.course_type,
          term: selectedFilters.term,
        };
        const data = await api.searchCourses(params);
        setCourses(data);
      } catch (err) {
        setError('Failed to fetch filtered courses');
      }
    };

    if (selectedFilters.course_type.length > 0 || selectedFilters.term.length > 0) {
      fetchFilteredCourses();
    } else {
      const fetchCourses = async () => {
        try {
          const data = await api.getAllCourses();
          setCourses(data);
        } catch (err) {
          setError('Failed to fetch courses');
        }
      };
      fetchCourses();
    }
  }, [selectedFilters]);

  return (
    <div className='CoursesPage__container'>
      <OrangeHeader text={"Informacije"} link_url={"/informacije"} />
      <img className='CoursePage__bg' src={pozadina} alt="" />
      <div className='CoursesPage__container-right'>
        <h1>Naši Kursevi</h1>
        <p>Na časovima koje vode naši predavači, učenik će razvijati vještine rješavanja problema i komunikacije koje će im pomoći da budu uspješni u školi i šire. Interaktivna online platforma sa snimljenim predavanjima dodatno dopunjava interaktivne online sesije.</p>
        <div className='CoursesPage__filter-container'>
          <div className='CoursesPage__filter-column'>
            <h3>Predmeti</h3> 
            <label className="filter-button">
              <input type="checkbox" name="course_type" value="matematika" onChange={handleFilterChange} />
              <span>Matematika</span>
            </label>
            <label className="filter-button">
              <input type="checkbox" name="course_type" value="fizika" onChange={handleFilterChange} />
              <span>Fizika</span>
            </label>
          </div>

          <div className='CoursesPage__filter-column'>
            <h3>Početak nastave</h3>
            <label className="filter-button">
              <input type="checkbox" name="term" value="I polugođe" onChange={handleFilterChange} />
              <span>Septembar</span>
            </label>
            <label className="filter-button">
              <input type="checkbox" name="term" value="II polugođe" onChange={handleFilterChange} />
              <span>Januar</span>
            </label>
     
          </div>
        </div>

        <div className='CourseDiv__container'>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {courses.map((course) => (
            <CourseCard key={course.id} item={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
