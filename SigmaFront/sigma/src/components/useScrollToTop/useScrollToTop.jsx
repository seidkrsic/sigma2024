// useScrollToTop.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.querySelector(".scroll-container").scrollTo(0, 0);
    setTimeout(() => {
        document.querySelector(".scroll-container").scrollTo(0, 0);
      }, 100);
  }, [pathname]); 

  useEffect(() => { 
    document.querySelector(".scroll-container").scrollTo(0, 0);
    setTimeout(() => {
      document.querySelector(".scroll-container").scrollTo(0, 0);
    }, 100);
  }, [])
};

export default useScrollToTop;
