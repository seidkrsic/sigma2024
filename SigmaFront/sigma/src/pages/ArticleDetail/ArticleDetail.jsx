import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MathJax from 'react-mathjax2';
import './ArticleDetail.css';

const ArticleDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`/api/posts/${slug}/`)
      .then(response => {
        setPost(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [slug]);

  if (!post) return <div>Učitavanje...</div>;

  return (
    <div className="article-detail">
      <h1 className="article-title">{post.title}</h1>
      {post.main_image && (
        <img src={post.main_image} alt={post.title} className="article-image" />
      )}
      <div className="article-content">
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
