// ArticleList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ArticleList.css';
import { API_URL } from '../../services/api';

const ArticleList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`${API_URL}/posts/`)
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error(error);
        setError('Došlo je do greške prilikom učitavanja članaka.');
      });
  }, []);

  if (error) return <div className="ArticleList__error">{error}</div>;
  if (posts.length === 0) return <div className="ArticleList__loading">Učitavanje...</div>;

  return (
    <div className="ArticleList__container">
      {posts.map(post => (
        <Link to={`/posts/${post.slug}/`} key={post.id} className="ArticleList__card">
          {post.main_image && (
            <img src={post.main_image} alt={post.title} className="ArticleList__image" />
          )}
          <h2 className="ArticleList__title">{post.title}</h2>
        </Link>
      ))}
    </div>
  );
};

export default ArticleList;
