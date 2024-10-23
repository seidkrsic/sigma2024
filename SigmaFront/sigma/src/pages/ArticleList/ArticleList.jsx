import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ArticleList.css';

const ArticleList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('/api/posts/')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="article-list">
      {posts.map(post => (
        <div key={post.id} className="article-card">
          {post.main_image && (
            <img src={post.main_image} alt={post.title} className="article-image" />
          )}
          <h2 className="article-title">{post.title}</h2>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
