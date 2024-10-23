// ArticleDetail.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MathJax from 'react-mathjax2';
import './ArticleDetail.css';
import { API_URL } from '../../services/api';

const ArticleDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`${API_URL}/posts/${slug}/`)
      .then(response => {
        setPost(response.data);
      })
      .catch(error => {
        console.error(error);
        setError('Članak nije pronađen ili je došlo do greške.');
      });
  }, [slug]);

  if (error) return <div className="ArticleDetail__error">{error}</div>;
  if (!post) return <div className="ArticleDetail__loading">Učitavanje...</div>;

  return (
    <div className="ArticleDetail__container">
      <h1 className="ArticleDetail__title">{post.title}</h1>
      {post.main_image && (
        <img src={post.main_image} alt={post.title} className="ArticleDetail__image" />
      )}
      <div className="ArticleDetail__content">
        <MathJax.Context input='tex'>
          <div>
            <MathJax.Text text={post.content} />
          </div>
        </MathJax.Context>
      </div>
    </div>
  );
};

export default ArticleDetail;
