import {React, useContext} from 'react'
import "./HomePage.css"  
import { Link } from 'react-router-dom'
import glavnaSlika from "../../images/glavnaSlika1.jpg" 
import AuthContext from '../../components/AuthContext/AuthContext'
import useScrollToTop from '../../components/useScrollToTop/useScrollToTop'
import WavyDiv from '../../components/WavyDiv/WavyDiv'
import slika1 from "../../images/SeidPic.png" 
import ArticleList from '../ArticleList/ArticleList'
import ImageSlider from '../../components/ImageSlider/ImageSlider'

const HomePage = () => {

    const {setActiveIndex} = useContext(AuthContext);
    useScrollToTop();


  return (
    <div className='HomePage__container-main'> 
        <div className='HomePage__container'>
            <div className='HomePage__container-left'>
                <h1 className='HomePage__headingSize'>Treniramo umove za izazove budućnosti!</h1>
                <p>"Naša Matematička Akademija za srednjoškolce koristi inovativne metode podučavanja kako bi učenicima pružila vještine potrebne za rješavanje kompleksnih matematičkih problema. Kroz našu virtualnu platformu, omogućavamo pristup kvalitetnom obrazovanju, uz podršku iskusnih instruktora. Naši učenici su pripremljeni da postanu lideri u oblasti matematike i nauke, spremni da se suoče s izazovima budućnosti."</p>
                <Link to="/informacije">Detaljnije</Link>
            </div>

            <div className='HomePage__container-right noSelect'>
                <img className='noSelect' src={glavnaSlika} alt="" />
            </div>

            
        </div> 



        <WavyDiv title="Problem Nedjelje">
        <div className='Problem_of_the_Week__container'>
          <div className='Problem_of_the_Week__link-container1'>
            <img src={slika1} alt="Problem Nedjelje" />

            <Link id='problem_of_the_week__archive-btn' to="/problems">Arhiva Problema</Link>
          </div>
          <div className='Problem_of_the_Week__link-container'>
            <p>
              Svake sedmice objavljujemo novi problem koji se sastoji iz više djelova, a koji je povezan s praznikom, godišnjim dobom, posebnim događajem ili nekom zanimljivom STEM ili matematičkom temom... potpuno besplatno!  
              Rješenje za svaki "Problem nedjelje" objavljuje se ovdje naredne sedmice. Ulogovani korisnici mogu da se takmiče i šalju svoja rješenja zadataka. Ukoliko se nađu među prva tri na mjesečnoj listi, osvojiće nagradu. Takođe, vodi se i vječna lista najboljih takmičara!
            </p>
            <Link id="problem_of_the_week__problem-btn" to="/problem-of-the-week">Vidi Problem</Link>
          </div>
        </div>
      </WavyDiv> 


      <section className="HomePage__latest-articles">
        <h2 className="HomePage__section-title">Najnoviji Članci</h2>
        <ArticleList limit={3} showPagination={false} />
        <div className="HomePage__view-all">
          <Link to="/posts" className="HomePage__view-all-button">
            Prikaži sve članke
          </Link>
        </div>
      </section>


      <section className="HomePage__latest-articles">
        <h2 className="HomePage__section-title">Naši Prijatelji</h2>
        <ImageSlider />
      </section>

     

        {/* <section className='HomePage__section-info'> 
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
        </section>   */}


        {/* <section className='HomePage__section-video'> 
                <div className='HomePage__section-video__left'>
                    <h1>Gdje učenje postaje zabava</h1>
                    <p>Akademija Sigma je specijalizovana online platforma kreirana sa ciljem da podrži i unaprijedi matematičke vještine i znanje mladih entuzijasta širom Crne Gore. Naša misija je da inspirišemo, obrazujemo i osnažimo nove generacije matematičara i fizičara, pružajući im alate i resurse potrebne za uspeh na raznim matematičkim takmičenjima i u akademskim sferama.</p>
                </div>

                <div className='HomePage__section-video__right'>
                <iframe width="" height="" src="https://www.youtube.com/embed/OmJ-4B-mS-Y?si=dToi6rp038n49Fvp" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>                </div>
        </section>  */}

        {/* <section className='HomePage__section-question'> 
                <h2>Zainteresovani ste?</h2> 
                <p>Pozovite nas da se informišete i saznate koji je pravi kurs za vaše dijete!</p> 
                <Link to="" onClick={() => window.location.href = `tel: +38268619730}`}>Pozovite nas</Link>
                
        </section>   */}

        
        

    </div>
  )
}

export default HomePage