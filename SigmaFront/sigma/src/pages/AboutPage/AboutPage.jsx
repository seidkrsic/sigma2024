import React, { useContext, useState, useEffect} from 'react';
import "./AboutPage.css";
import PageList from '../../components/PageList/PageList';
import AuthContext from '../../components/AuthContext/AuthContext';
// import sigma from "../../images/sigma.png" 
import pozadina from "../../images/pozadina1.jpg";
import api from '../../services/api';
import TeacherPopup from '../../components/TeacherPopup/TeacherPopup';
import OrangeHelpHeader from '../../components/OrangeHelpHeader/OrangeHelpHeader';

import useScrollToTop from '../../components/useScrollToTop/useScrollToTop';
import OrangeHeader from '../../OrangeHeader/OrangeHeader';

const AboutPage = () => {

  const menuItems = [
    {
      name: 'O Sigma Akademiji',
      path: '/informacije/o_nama',
    },
    {
      name: 'Osnivači',
      path: '/informacije/osnivaci',
    },
    {
      name: 'Moderatori',
      path: '/informacije/predavaci',
    },
    {
      name: 'Naši Prijatelji',
      path: '/informacije/prijatelji',
    }, 
    // {
    //   name: 'Kontakt',
    //   path: '/informacije/kontakt',
    // }
  ]; 

  const slides = [
    // {
    //   name: 'CKB Banka',
    //   logo: require('../../images/sponsor1.jpeg'),
    // //   link: 'https://www.sponzor1.com',
    // },
    {
      name: 'Logate Akademija',
      logo: require('../../images/sponsor2.png'),
    //   link: 'https://www.sponzor2.com',
    },
    {
      name: 'Domen.me',
      logo: require('../../images/sponsor3.png'),
    //   link: 'https://www.sponzor3.com',
    }, 
    {
      name: 'Barber Miloš',
      logo: require('../../images/sponsor4.JPG'),
    //   link: 'https://www.sponzor3.com',
    }, 
    {
      name: 'Art Beton',
      logo: require('../../images/sponsor5.JPG'),
    //   link: 'https://www.sponzor3.com',
    },
    {
      name: 'Firenet',
      logo: require('../../images/sponsor7.png'),
    //   link: 'https://www.sponzor3.com',
    },
    {
      name: 'Studio Abarh',
      logo: require('../../images/sponsor6.jpg'),
    //   link: 'https://www.sponzor3.com',
    },
 
  ];

  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const { activeIndex, isPageListVisible } = useContext(AuthContext);
  useScrollToTop();

  useEffect(() => {
    window.scrollTo(0,0);
    const fetchTeachers = async () => {
      try {
        const response = await api.getAllProfiles() 
        setTeachers(response);
      } catch (error) {
        console.error('Failed to fetch teachers', error);
      }
    };

    fetchTeachers();

  }, [activeIndex]);


  const handleTeacherClick = (teacher) => {
    setSelectedTeacher(teacher);
    
  };

  const closePopup = () => {
    setSelectedTeacher(null);
  }; 

  


  return (
    <div className='AboutPage__container1'>
      <OrangeHeader text={"Blog"} link_url={"/posts"} />
      <div className='AboutPage__container'>
    
      
        {/* <img className='CoursePage__bg' src={pozadina} alt="" /> */}
        <div className='AboutPage__container-left'>
          <OrangeHelpHeader />
        

          <div className={!isPageListVisible ? 'AboutPage__PageList-container' : 'AboutPage__PageList-container page_toggle'}>
            {menuItems.map((item, index) => (
              <PageList key={index} item={item} index={index} />
            ))}
          </div>
        

  
        </div>

          <div className='AboutPage__container-right'>

            {/* FIRST SECTION */}


          { activeIndex === 0 &&
                <div className='AboutPage__section'>
                <h1 className='AboutPage__section-heading'>Sigma Akademija</h1>
            
                <div className='AboutPage__section-infoText'>
                      <h2>O Nama</h2>
                      <p>Dobrodošli na <strong>Sigma Academy</strong> — platformu posvećenu promociji matematike među mladima! Naša misija je da podstaknemo radoznalost, kreativnost i ljubav prema matematici kod djece i mladih.</p>
                      
                      <h2>Kako funkcioniše?</h2>
                      <p><strong>Besplatno učešće:</strong> Svi naši sadržaji su potpuno besplatni i dostupni svima.</p>
                      <p><strong>Takmičenje:</strong> Registrovani korisnici mogu da se takmiče i šalju svoja rješenja. Svake sedmice imate priliku da testirate svoje znanje i veštine.</p>
                      <p><strong>Nagrade:</strong> Najuspješniji takmičari koji se nađu među prva tri na mjesečnoj listi osvajaju vrijedne nagrade.</p>
                      <p><strong>Rang liste:</strong> Vodimo i vječnu listu najboljih takmičara, gdje možete pratiti svoj napredak i uporediti se sa drugima.</p>
                      
                      <h2>Naša vizija</h2>
                      <p>Vjerujemo da je matematika više od brojki i formula — ona je ključ za razumijevanje svijeta oko nas. Naša platforma je osmišljena da pruži pristupačne i zanimljive sadržaje koji će inspirisati novu generaciju matematičara, naučnika i inženjera.</p>
                      
                      <h2>Blog</h2>
                      <p>Pored takmičenja, na našem blogu možete pronaći članke o raznim matematičkim temama, zanimljivostima i primjenama matematike u svakodnevnom životu. Cilj nam je da pokažemo kako je matematika prisutna svuda oko nas i koliko može biti fascinantna.</p>
                      
                      <h2>Pridružite nam se!</h2>
                      <p>Bez obzira da li ste učenik koji želi da proširi svoje znanje, nastavnik koji traži dodatne resurse za svoje učenike ili jednostavno neko ko voli matematiku, <strong>Sigma Academy</strong> je pravo mjesto za vas. Pridružite se našoj zajednici i zajedno ćemo istraživati čudesni svijet matematike!</p>
                  </div>

            </div>
            
          } 
          {/* NEXT SECTION */} 

          { 
            activeIndex === 1 && 

              <div className='AboutPage__section'>
                <h1 className='AboutPage__section-heading'>Osnivači</h1>

                {/* instructor */}
                <div className='AboutPage__InstructorCard-container'>
                  <h3>Spec Seid Kršić</h3>
                    <div className='AboutPage__InstructorCard-textContainer'>
                      
                      <p>Seid nam dolazi iz Podgorice. Rođen je u Beranama, a završio je Gimnaziju u Danilovgradu. Završio je specijalističke studije na Prirodno-matematičkom fakultetu Univerziteta Crne Gore u Podgorici. Kao predsjednik Studentskog Saveza Prirodno-matematičkog fakulteta organizovao je brojne edukativne programe poput kurseva za web programiranje i WordPress, IT konferencije na Žabljaku, kao i Webinar o Vještačkoj Inteligenciji za studente. Takođe, od 2017. godine radi u osnovnoj školi kao nastavnik matematike i informatike.

                        Kao Frilenser već par godina radi kao FullStack Developer, a omiljene frontend tehnologije su mu HTML, CSS i React JS, a na bekendu – Python (Django Framework). Veliki je entuzijasta matematičkih i programerskih izazovnih problema i uživa u njihvom rješavanju.</p>
                      <img className='AboutPage__InstructorCard-img' src="https://sigma-academy.me/media/profile_pictures/seidkrsic_PixH6sP.jpeg" alt="" />

                    </div>

                </div> 

                {/* instructor */}
                <div className='AboutPage__InstructorCard-container'>
                  <h3>Dr Anton Gjokaj</h3>
                    <div className='AboutPage__InstructorCard-textContainer'>
                      <p>Anton Gjokaj rođen je 13. juna 1994. godine u Podgorici. Osnovnu i srednju školu završio je u Tuzima. Tokom tog perioda učestvovao je na takmičenjima iz matematike i biologije i ostvario zapažene rezultate na državnom nivou i predstavljao Crnu Goru na balkanskim i internacionalnim olimpijadama iz matematike.

                          Osnovne i specijalističke studije na Prirodno-matematičkom fakultetu, smjer Matematika, završio je 2017. godine sa prosječnom ocjenom 10. U martu 2019. godine završio je magistarske studije pri istom fakultetu, braneći rad “Konveksne i univalentne harmonijske funkcije u kompleksnoj ravni i njihova geometrija”, pod mentorstvom prof. dr Davida Kalaja.

                          Doktorsku disertaciju pod nazivom “Granična svojstva kvazikonformnih harmonijskih preslikavanja u prostoru” odbranio je na Prirodno-matematičkom fakultetu u Podgorici, 07. novembra 2023. godine, pod mentorstvom prof. dr Davida Kalaja. Tokom doktorskih studija boravio je u Univerzitetu Camerino, u Italiji.

                          Za postignute rezultate u toku studija dobitnik je Studentske nagrade Univerziteta Crne Gore za najboljeg studenta Prirodno-matematičkog fakulteta, Plakete Univerziteta Crne Gore, stipendije CANU-a za izuzetan uspjeh i nagrade Ministarstva nauke i tehnološkog razvoja Vlade Crne Gore za najuspješnijeg mladog naučnika do 30 godina života u 2022. godini.

                          Od septembra 2017. godine angažovan je kao saradnik u nastavi na Prirodno-matematičkom fakultetu u Podgorici.</p>
                      <img className='AboutPage__InstructorCard-img' src="https://sigma-academy.me/media/profile_pictures/antonDjokaj_40h0sT4.jpg" alt="" />

                    </div>

                </div> 

                {/* instructor */}
                <div className='AboutPage__InstructorCard-container'>
                  <h3>MSc Vuk Jovović</h3>
                    <div className='AboutPage__InstructorCard-textContainer'>
                      <p>Vuk Jovović je rođen 12. marta 1998. godine u Nikšiću, gdje je završio osnovnu i srednju školu. Dobitnik je diplome Luča, a na završnoj godini srednje škole je ostvario prvo mjesto na Olimpijadi znanja iz Matematike.

                        Školovanje 2017. godine nastavlja na Prirodno-matematičkom fakultetu u Podgorici, smjer Matematika i računarske nauke. Osnovne studije završava 2020. godine sa prosječnom ocjenom 9,66. Iste godine upisuje master studije, ovog puta na smjeru Matematika, a iste završava 2023. godine sa prosječnom ocjenom 9,71. Master tezu "Metod višestruke imputacije" je radio pod mentorstvom Prof. dr Božidara Popovića, a odbranio je 20. oktobra 2023. godine, sa ocjenom A.

                        Tokom školovanja je bio stipendista Vlade Crne Gore i grada Nikšića, a bio je zaposlen u ulozi saradnika u nastavi na Univerzitetu Crne Gore, kao i Univerzitetu Donja Gorica. Dugogodišnji je član Fondacije za promovisanje nauke "PRONA" u svojstvu rukovodioca praktikuma matematike.

                        Boravio je na nekoliko prestižnih, internacionalnih škola i seminara, kao što su CERN-ova Ljetnja škola za studente u Ženevi, Ljetnja škola matematike na Univerzitetu u Ljubljani, trening škola o matematici u genetskim kodovima u organizaciji Univerziteta u Manhajmu, ali i mnogim drugim.

                        Trenutno živi u Nikšiću.</p>
                      <img className='AboutPage__InstructorCard-img' src="https://sigma-academy.me/media/profile_pictures/vukkkk.jpeg" alt="" />

                    </div>

                </div> 
            


              </div>
          }

          {/* NEXT SECTION */}

          {
            activeIndex === 2 && 

            <div className='AboutPage__section'>
                <h1 className='AboutPage__section-heading'>Naši Moderatori</h1> 

                <div className='AboutPage__InstructorCard-textContainerSpecial'>
                    Naši posvećeni i talentovani moderatori su srce Sigma akademije. Oni neumorno rade na kreiranju kvalitetnog i inspirativnog sadržaja koji obogaćuje iskustvo svih naših korisnika. Kroz svoju strast i predanost obrazovanju, naši moderatori osiguravaju da svaki posjetilac pronađe nešto vrijedno na našoj platformi. Upoznajte naše moderatore klikom na njihove slike i saznajte više o njihovom radu.
                </div>


                <div className='AboutPage__section-infoText2'> 

                  {teachers?.map((teacher) => (
                    <div key={teacher?.id} onClose={closePopup} className='AboutPage__InstructorCard-circleContainer' onClick={() => handleTeacherClick(teacher)}>
                      <img className='AboutPage__InstructorCard-imgCircle' src={teacher?.image_url} alt={teacher?.name} />
                      <h3>{teacher?.name}</h3>
                    </div>
                  ))}

                </div> 

                {selectedTeacher && <TeacherPopup teacher={selectedTeacher} onClose={closePopup} /> }

            </div>
          }

          {
            activeIndex === 3 &&  
            <div className='AboutPage__section'>
              <h1 className='AboutPage__section-heading'>Naši Prijatelji</h1> 
              <div className='AboutPage__section-infoText2'> 
                  

                  {/* <div className='AboutPage__InstructorCard-circleContainer'>
                      <img className='AboutPage__InstructorCard-imgsquare' src={slides[0]?.logo} alt="" />
                      {/* <h3>{slides[0].name}</h3> */}
                  {/* </div> */} 

                  <div className='AboutPage__InstructorCard-circleContainer'>
                      <img className='AboutPage__InstructorCard-imgsquare' src={slides[0]?.logo} alt="" />
                      {/* <h3>{slides[1].name}</h3> */}
                  </div> 

                  {/* <div className='AboutPage__InstructorCard-circleContainer'>
                      <img className='AboutPage__InstructorCard-imgsquare' src={slides[2]?.logo} alt="" />
                      {/* <h3>{slides[0].name}</h3> */}
                  {/* </div>  */} 
                  <div className='AboutPage__InstructorCard-circleContainer'>
                      <img className='AboutPage__InstructorCard-imgsquare' src={slides[1]?.logo} alt="" />
                      {/* <h3>{slides[0].name}</h3> */}
                  </div> 
                  <div className='AboutPage__InstructorCard-circleContainer'>
                      <img className='AboutPage__InstructorCard-imgsquare' src={slides[2]?.logo} alt="" />
                      {/* <h3>{slides[0].name}</h3> */}
                  </div> 
                  <div className='AboutPage__InstructorCard-circleContainer'>
                      <img className='AboutPage__InstructorCard-imgsquare' src={slides[3]?.logo} alt="" />
                      {/* <h3>{slides[0].name}</h3> */}
                  </div> 
                  <div className='AboutPage__InstructorCard-circleContainer'>
                      <img className='AboutPage__InstructorCard-imgsquare' src={slides[4]?.logo} alt="" />
                      {/* <h3>{slides[0].name}</h3> */}
                  </div> 
              </div>
            </div>
          } 

          { 
            activeIndex === 4 &&  
              <div className='AboutPage__section'> 
                  <h1 className='AboutPage__section-heading'>Kontakt</h1> 

                  <div class="contact-container">
                      {/* <div class="contact-logo">
                      
                        <img src={sigma} alt="Sigma Akademija" className="footer-logo" /> 
                        <h4 className='sigma__text'>Sigma Academy</h4>
                        
                      </div> */}

                      <div class="contact-details">
                          <h2>Informacije</h2>
                          <p>Email: <a href="mailto:info@primjer.com">sigma-academy@gmail.com</a></p>
                          <p>Telefon: <a href="tel:+38268619730">+382 68/619-730</a></p>
                      </div>
                  
                      <div class="contact-map">
                          <h2>Naša Lokacija</h2>
                          <iframe
                              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0190732038315!2d144.95605441531696!3d-37.8172099797517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d5dfd2fca77%3A0xf539baae3b879a0!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1600343285047!5m2!1sen!2sau"
                              width=""
                              height="400"
                              allowfullscreen=""
                              aria-hidden="false"
                              tabindex="0"></iframe>
                      </div>
                  </div>

              </div>
            
          }
          
        


        </div>

        </div>
    </div>
  );
};

export default AboutPage;
