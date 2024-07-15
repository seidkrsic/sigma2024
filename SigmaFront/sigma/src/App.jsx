
import { useContext } from 'react';
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

  return (
    <div className="App">
      <Router>
        <Header />
          <Routes>
            <Route path={"/"} element={<HomePage />} /> 
            {isAuthenticated ?  <Route path={"/blog"} element={<BlogPage />} > </Route> : <Route path={"/login"} element={<LoginPage />} />}  
            <Route path={"/kursevi"} element={<CoursesPage />} />
            <Route path={"/informacije"} element={<AboutPage />} /> 
            <Route path={"/kurs/:id"} element={<SingleCoursePage />} />
            <Route path={"/login"} element={<LoginPage />} />
          </Routes>

        <Footer />
      </Router>
      
    </div>
  );
}

export default App;
