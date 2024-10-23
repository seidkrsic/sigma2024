// ArticleList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ArticleList.css';
import { API_URL } from '../../services/api.jsx'; // Uveri se da imaš API_URL definisan

const ArticleList = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPosts = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/posts/`, {
        params: { page: page },
      });
      setPosts(response.data.results);
      setTotalPages(Math.ceil(response.data.count / 10)); // Pretpostavljam da je page_size=10
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

  const handleNext = () => {
    if (currentPage < totalPages) {
      fetchPosts(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      fetchPosts(currentPage - 1);
    }
  };

  return (
    <div className="ArticleList__container">
      {error && <div className="ArticleList__error">{error}</div>}
      {loading ? (
        <div className="ArticleList__loading">Učitavanje...</div>
      ) : (
        <>
          <div className="ArticleList__grid">
            {posts.map((post) => (
              <Link to={`/posts/${post.slug}/`} key={post.id} className="ArticleList__card">
                {post.main_image && (
                  <img src={post.main_image} alt={post.title} className="ArticleList__image" />
                )}
                <h2 className="ArticleList__title">{post.title}</h2>
              </Link>
            ))}
          </div>
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
          <div className="ArticleList__all-link">
            <Link to="/posts/" className="ArticleList__all-link-button">
              Prikaži sve članke
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default ArticleList;
