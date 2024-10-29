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
      name: 'Predavači',
      path: '/informacije/predavaci',
    },
    {
      name: 'Naši Prijatelji',
      path: '/informacije/prijatelji',
    }, 
    {
      name: 'Kontakt',
      path: '/informacije/kontakt',
    }
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
      <OrangeHeader text={"Kursevi"} link_url={"/kursevi"} />
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
                    <p>Akademija Sigma je specijalizovana online platforma kreirana sa ciljem da podrži i unaprijedi matematičke veštine i znanje mladih entuzijasta širom sveta. Naša misija je da inspirišemo, obrazujemo i osnažimo nove generacije matematičara i fizičara, pružajući im alate i resurse potrebne za uspeh na raznim matematičkim takmičenjima i u akademskim sferama.</p>
                    
                    <h2>Naši Programi</h2>
                    <p>Akademija Sigma nudi raznovrsne programe i kurseve prilagođene različitim nivoima znanja i interesovanjima:</p>
                    <div>
                        <p>Naši osnovni kursevi su idealni za učenike osnovnih škola koji žele da steknu čvrste osnove u matematici i razviju logičko razmišljanje. Za one sa naprednim znanjem, nudimo napredne kurseve koji pokrivaju kompleksne matematičke teme i pripremaju polaznike za nacionalna i međunarodna takmičenja. Specijalizovani programi pripreme za takmičenja pružaju intenzivnu pripremu za događaje poput IMO, Balkanijade, Kengura i drugih. Takođe, naš mentorski program nudi jedinstvenu priliku za individualni rad sa iskusnim mentorima, koji su sami bili uspešni takmičari i sada žele da svoje znanje i iskustvo prenesu novim generacijama.</p>
                    </div>
                    
                    <h2>Naša Metodologija</h2>
                    <p>Verujemo da je svaki učenik jedinstven, te naši programi koriste personalizovan pristup učenju. Kombinujemo tradicionalne metode sa inovativnim tehnologijama kako bismo osigurali da svaki polaznik dobije podršku prilagođenu njegovim potrebama i ritmu učenja. Naši kursevi su interaktivni, sadrže veliki broj praktičnih zadataka, video lekcija, kvizova i simulacija takmičenja.</p>
                    
                    <h2>Naš Tim</h2>
                    <p>Na Akademiji Sigma ponosimo se našim timom stručnjaka i entuzijasta, koji uključuje priznate profesore matematike, bivše takmičare i stručnjake iz oblasti obrazovanja. Svi naši instruktori poseduju bogato iskustvo u radu sa mladim talentima i imaju duboku strast prema matematici.</p>
                    
                    <h2>Zašto Odabrati Akademiju Sigma?</h2>
                    <div>
                        <p>Naša online platforma omogućava vam da učite kad god i gde god želite, pružajući maksimalnu fleksibilnost. Polaznicima je dostupan kvalitetan sadržaj i ekspertiza našeg tima, dok stalna podrška kroz mentorstvo i interaktivne sesije osigurava da nijedan polaznik ne ostane bez pomoći. Pridružite se našoj globalnoj zajednici mladih matematičara, delite svoja iskustva i znanje, i rastite zajedno sa nama.</p>
                    </div>
                    
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
                <h1 className='AboutPage__section-heading'>Naši predavači</h1> 

                <div className='AboutPage__InstructorCard-textContainerSpecial'>
                    Naši iskusni i visoko kvalifikovani predavači su nekada i sami bili takmičari. Oni predaju na Sigma akademiji da bi podijelili svoju ljubav prema učenju sa sljedećom generacijom intelektualnih lidera. Pregledajte biografije naših predavača klikom na njihove slike.            </div>


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
                  
{/* 
                  <div className='AboutPage__InstructorCard-circleContainer'>
                      <img className='AboutPage__InstructorCard-imgsquare' src="https://www.adobe.com/content/dam/cc/us/en/creativecloud/design/discover/mascot-logo-design/mascot-logo-design_fb-img_1200x800.jpg" alt="" />
                      <h3>CKB banka</h3>
                  </div>

                  <div className='AboutPage__InstructorCard-circleContainer'>
                      <img className='AboutPage__InstructorCard-imgsquare' src="data:image/jpeg;base64,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" alt="" />
                      <h3>Logate Institut</h3>
                  </div> */}

                  {/* <div className='AboutPage__InstructorCard-circleContainer'>
                      <img className='AboutPage__InstructorCard-imgsquare' src="https://www.adobe.com/content/dam/cc/us/en/creativecloud/design/discover/mascot-logo-design/mascot-logo-design_fb-img_1200x800.jpg" alt="" />
                      <h3>Erste Banka</h3>
                  </div> */}
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
