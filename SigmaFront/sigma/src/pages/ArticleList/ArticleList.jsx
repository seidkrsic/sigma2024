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
  }, [currentPage]);

  useScrollToTop();  

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
            <div className="ArticleList__pagination">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="ArticleList__button"
              >
                Prethodna
              </button>
              <span className="ArticleList__page-info">
                Stranica {currentPage} od {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="ArticleList__button"
              >
                Sledeća
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ArticleList;
