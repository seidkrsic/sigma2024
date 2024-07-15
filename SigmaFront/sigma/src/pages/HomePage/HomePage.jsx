import {React, useContext} from 'react'
import "./HomePage.css"  
import { Link } from 'react-router-dom'
import glavnaSlika from "../../images/glavnaSlika.webp"
import AuthContext from '../../components/AuthContext/AuthContext'

const HomePage = () => {

    const {setActiveIndex} = useContext(AuthContext);
    window.scrollTo(0,0)


  return (
    <div className='HomePage__container-main'> 
        <div className='HomePage__container'>
            <div className='HomePage__container-left'>
                <h1 className='HomePage__headingSize'>Treniramo umove za izazove budućnosti!</h1>
                <p>"Naša Matematička Akademija za srednjoškolce koristi inovativne metode podučavanja kako bi učenicima pružila vještine potrebne za rješavanje kompleksnih matematičkih problema. Kroz našu virtualnu platformu, omogućavamo pristup kvalitetnom obrazovanju, uz podršku iskusnih instruktora. Naši učenici su pripremljeni da postanu lideri u oblasti matematike i nauke, spremni da se suoče s izazovima budućnosti."</p>
                <Link to="/kursevi">Detaljnije</Link>
            </div>

            <div className='HomePage__container-right'>
                <img src={glavnaSlika} alt="" />
            </div>

            
        </div>

        <section className='HomePage__section-info'> 
                <div className='HomePage__section-info__left'>
                    <h2>IZAZIVAMO I MOTIVIŠEMO UČENIKE</h2>
                    <p>Naši rigorozni časovi matematike i fizike su mnogo više od pripreme za testove ili takmičenja, oni inspirišu učenike da dostignu svoj puni potencijal.
                    </p>
                    <Link to={"/kursevi"}>Kursevi</Link>
                </div>

                <div className='HomePage__section-info__right'>
                    <h2>NAŠI PROVJERENI I ISKUSNI PREDAVAČI</h2>
                    <p>Na Akademiji Sigma ponosimo se našim timom stručnjaka i entuzijasta, koji uključuje priznate profesore matematike, bivše takmičare i stručnjake iz oblasti obrazovanja. </p>
                    <Link onClick={()=> { setActiveIndex(2)}} to={"/informacije"}>Predavači</Link>
                </div>
        </section> 


        <section className='HomePage__section-video'> 
                <div className='HomePage__section-video__left'>
                    <h1>Where Exploration Meets Challenge</h1>
                    <p>Art of Problem Solving has been a leader in math education for high-performing students since 1993. We launched AoPS Academy in 2016 to bring our rigorous curriculum and expert instructors into classrooms around the United States.</p>
                </div>

                <div className='HomePage__section-video__right'>
                    <iframe width="" height="" src="https://www.youtube.com/embed/WUvTyaaNkzM?si=aSVzs0a1xenkewnu" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </div>
        </section> 

        <section className='HomePage__section-question'> 
                <h2>Zainteresovani ste?</h2> 
                <p>Pozovite nas da se informišete i saznate koji je pravi kurs za vaše dijete!</p> 
                <Link>Pozovite nas</Link>
        </section>  

        
        

    </div>
  )
}

export default HomePage