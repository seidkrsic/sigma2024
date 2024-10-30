// ArticleList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ArticleList.css';
import { API_URL } from '../../services/api.jsx'; // Uveri se da imaš API_URL definisan
import useScrollToTop from '../../components/useScrollToTop/useScrollToTop.jsx';

const ArticleList = ({ limit = null, showPagination = true }) => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPosts = async (page) => {
    setLoading(true);
    try {
      const params = { page: page };
      if (limit) {
        params.page_size = limit;
      }

      const response = await axios.get(`${API_URL}/posts/`, {
        params: params,
      });
      setPosts(response.data.results);
      if (limit) {
        setTotalPages(1); // Ako imamo limit, nema više stranica
      } else {
        setTotalPages(Math.ceil(response.data.count / 10)); // Pretpostavljam da je page_size=10
      }
      setCurrentPage(page);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Došlo je do greške prilikom učitavanja članaka.');
    }
    setLoading(false);

  };

  useEffect(() => {
    fetchPosts(currentPage);
    document.querySelector(".scroll-container").scrollTo(0, 0);
    setTimeout(() => {
        document.querySelector(".scroll-container").scrollTo(0, 0);
      }, 100);
  }, [currentPage]);

  useScrollToTop();  

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      fetchProblems(currentPage + 1);
    }
    document.querySelector(".scroll-container").scrollTo(0, 0);
    setTimeout(() => {
        document.querySelector(".scroll-container").scrollTo(0, 0);
      }, 100);
  
  };
  
  const handlePrevPage = () => {
    if (currentPage > 1) {
      fetchProblems(currentPage - 1);
    }
    document.querySelector(".scroll-container").scrollTo(0, 0);
    setTimeout(() => {
        document.querySelector(".scroll-container").scrollTo(0, 0);
      }, 100);

  };

  const pagesToShow = [];

  if (totalPages <= 3) {
    for (let i = 1; i <= totalPages; i++) {
      pagesToShow.push(i);
    }
  } else {
    if (currentPage === 1) {
      pagesToShow.push(1, 2, '...', totalPages);
    } else if (currentPage === totalPages) {
      pagesToShow.push(1, '...', totalPages - 1, totalPages);
    } else {
      pagesToShow.push(1, '...', currentPage, '...', totalPages);
    }
  }

  return (
    <div className="ArticleList__container">
      {error && <div className="ArticleList__error">{error}</div>}
      {loading ? (
        <div className="ArticleList__loading">Učitavanje...</div>
      ) : (
        <>
          <div className={`ArticleList__grid ${limit ? 'ArticleList__grid--limited' : ''}`}>
            {posts.map((post) => (
              <Link to={`/posts/${post.slug}/`} key={post.id} className="ArticleList__card">
                {post.main_image && (
                  <img src={post.main_image} alt={post.title} className="ArticleList__image" loading="lazy" />
                )}
                <h2 className="ArticleList__title">{post.title}</h2>
              </Link>
            ))}
          </div>
          {showPagination && !limit && (
            <div className="pagination-buttons">
            {currentPage > 1 && (
              <button onClick={handlePrevPage} className="pagination-button">
                Prethodna
              </button>
            )}

            {pagesToShow.map((page, index) => (
              page === '...' ? (
                <span key={index} className="pagination-dots">...</span>
              ) : (
                <button
                  key={page}
                  onClick={() => fetchProblems(page)}
                  className={`pagination-button ${page === currentPage ? 'active' : ''}`}
                >
                  {page}
                </button>
              )
            ))}

            {currentPage < totalPages && (
              <button onClick={handleNextPage} className="pagination-button">
                Sledeća
              </button>
            )}
          </div>
          )}
        </>
      )}
    </div>
  );
};

export default ArticleList;
