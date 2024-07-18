// useScrollToTop.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    setTimeout(() => {
        window.scrollTo(0, 10);
      }, 100);
  }, [pathname]);
};

export default useScrollToTop;
