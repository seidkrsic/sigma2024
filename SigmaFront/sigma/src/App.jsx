
import { useContext, useEffect } from 'react';
import './App.css';
import BlogPage from './pages/BlogPage/BlogPage';
import HomePage from './pages/HomePage/HomePage';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AuthContext from './components/AuthContext/AuthContext';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import CoursesPage from './pages/CoursesPage/CoursesPage';
import AboutPage from './pages/AboutPage/AboutPage';
import SingleCoursePage from './pages/SingleCoursePage/SingleCoursePage';
import LoginPage from './pages/LoginPage/LoginPage';



function App() {

  const {isAuthenticated} = useContext(AuthContext);

  useEffect(() => {
    const scrollContainer = document.querySelector('.scroll-container');

    function handleResize() {
      scrollContainer.style.height = `${window.innerHeight - 45}px`;
    }

    const mobileMediaQuery = window.matchMedia('(max-width: 812px)');

    if (mobileMediaQuery.matches) {
      handleResize(); // Podesi visinu pri prvom učitavanju

      window.addEventListener('resize', handleResize);

      // Cleanup listener pri unmount-u komponenta
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);
    


  return (
    <div className="App">
      <Router>
        <Header />
        <div className="scroll-container"> 
          <Routes>
            <Route path={"/"} element={<HomePage />} /> 
            {isAuthenticated ?  <Route path={"/blog"} element={<BlogPage />} > </Route> : <Route path={"/login"} element={<LoginPage />} />}  
            <Route path={"/kursevi"} element={<CoursesPage />} />
            <Route path={"/informacije"} element={<AboutPage />} /> 
            <Route path={"/kurs/:id"} element={<SingleCoursePage />} />
            <Route path={"/login"} element={<LoginPage />} />
          </Routes>

          <Footer /> 
        </div>
      </Router>
      
    </div>
  );
}

export default App;
