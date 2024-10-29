// ArticleDetail.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import MathJax from 'react-mathjax2';
import './ArticleDetail.css';
import { API_URL } from '../../services/api.jsx';
import useScrollToTop from '../../components/useScrollToTop/useScrollToTop.jsx';


const ArticleDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [recommendedPosts, setRecommendedPosts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingRecommendations, setLoadingRecommendations] = useState(true);
  const [errorRecommendations, setErrorRecommendations] = useState('');
  useScrollToTop(); 
  
  useEffect(() => {

    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/posts/${slug}/`);
        setPost(response.data);
        setError('');
      } catch (err) {
        console.error(err);
        setError('Članak nije pronađen ili je došlo do greške.');
      }
      setLoading(false);
    };

    fetchPost();
  }, [slug]);

  useEffect(() => {
    if (post) {
      const fetchRecommended = async () => {
        setLoadingRecommendations(true);
        try {
          const response = await axios.get(`${API_URL}/posts/`, {
            params: { ordering: '-published_date', exclude: post.id, page_size: 2 },
          });
          setRecommendedPosts(response.data.results);
          setErrorRecommendations('');
        } catch (err) {
          console.error(err);
          setErrorRecommendations('Došlo je do greške prilikom učitavanja preporučenih članaka.');
        }
        setLoadingRecommendations(false);
      };

      fetchRecommended();
    }
  }, [post]);

  if (loading) return <div className="ArticleDetail__loading">Učitavanje...</div>;
  if (error) return <div className="ArticleDetail__error">{error}</div>;

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

      {/* Preporučeni Članak */}
      <div className="ArticleDetail__recommended">
        <h2 className="ArticleDetail__recommended-title">Preporučeni Članci</h2>
        {loadingRecommendations ? (
          <div className="ArticleDetail__loading">Učitavanje preporučenih članaka...</div>
        ) : errorRecommendations ? (
          <div className="ArticleDetail__error">{errorRecommendations}</div>
        ) : (
          <div className="ArticleDetail__recommended-list">
            {recommendedPosts.map((recPost) => (
              <Link to={`/posts/${recPost.slug}/`} key={recPost.id} className="ArticleDetail__recommended-card">
                {recPost.main_image && (
                  <img src={recPost.main_image} alt={recPost.title} className="ArticleDetail__recommended-image" />
                )}
                <h3 className="ArticleDetail__recommended-title">{recPost.title}</h3>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Link ka svim člancima */}
      <div className="ArticleDetail__all-link">
        <Link to="/posts/" className="ArticleDetail__all-link-button">
          Prikaži sve članke
        </Link>
      </div>
    </div>
  );
};

export default ArticleDetail;
