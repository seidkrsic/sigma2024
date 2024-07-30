import React from 'react'
import "./CourseCard.css" 
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';


const CourseCard = ({item}) => {

  
  return (
    <div className='CourseCard__container'>
        <div className='CourseCard__container-img__container'>
            {item.image && <img src={item.image_url} />}
            {/* <div className='CourseCard__level'>{item.level}</div> */}
        </div>

        <div className='CourseCard__container-info_container'>
            <div>
                <h3>{item.title} <span>({item.course_type})</span></h3>
                <p>{item.short_description.slice(0,120) + "..."}</p> 
            </div>
           
            <Link to={`/kurs/${item.id}`} className='CourseCard__container-info_container-button'><button className='CourseCard__container-info_container-link'>Detaljnije</button></Link>
        </div>
    </div>
  )
}

export default CourseCard