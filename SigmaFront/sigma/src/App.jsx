
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
import ActivateAccount from './components/ActivateAccount/ActivateAccount';
import ResetPassword from './components/ResetPassword/ResetPassword';
import PasswordResetRequest from './components/PasswordResetRequest/PasswordResetRequest';
import ProblemList from './pages/ProblemList/ProblemList';
import ProblemOfTheWeek from './pages/ProblemOfTheWeek/ProblemOfTheWeek';
import ArticleDetail from './pages/ArticleDetail/ArticleDetail';
import ArticleList from './pages/ArticleList/ArticleList';
import RankingsComponent from './components/RankingsComponent/RankingsComponent';


function App() {

  const {isAuthenticated} = useContext(AuthContext);

  
  useEffect(() => {
    const scrollContainer = document.querySelector('.scroll-container');

    function handleResize() {
      scrollContainer.style.height = `${window.innerHeight}px`;
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
      <div className="scroll-container"> 
        <Header />
     
          <Routes>

            <Route path={"/"} element={<HomePage />} /> 
            {/* {isAuthenticated ?  <Route path={"/posts"} element={<BlogPage />} > </Route> : <Route path={"/login"} element={<LoginPage />} />}   */}
            <Route path={"/kursevi"} element={<CoursesPage />} />
            <Route path={"/informacije"} element={<AboutPage />} /> 
            <Route path={"/kurs/:id"} element={<SingleCoursePage />} />
            <Route path={"/login"} element={<LoginPage />} />
            <Route path="/activate/:uid/:token" element={<ActivateAccount />} />
            <Route path="/reset-password/:uid/:token/" element={<ResetPassword />} />
            <Route path="/password-reset" element={<PasswordResetRequest />} />
            <Route path="/problems" element={<ProblemList />} />
            <Route path="/problem-of-the-week" element={<ProblemOfTheWeek />} />
            <Route path="/posts" element={<ArticleList />} />
            <Route path="/posts/:slug" element={<ArticleDetail />} />
            <Route path="/rankings" element={<RankingsComponent />} />

          </Routes>

          <Footer /> 
        </div>
      </Router>
      
    </div>
  );
}

export default App;
