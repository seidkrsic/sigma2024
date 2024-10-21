import React, { useState, useEffect } from 'react';
import { API_URL } from '../../services/api.jsx'
import "./ProblemList.css" 

const ProblemList = () => {
  const [problems, setProblems] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(`${API_URL}/problems/`);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchProblems = (url) => {
    setLoading(true);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setProblems(data.results);
        setNextPageUrl(data.next);
        setPrevPageUrl(data.previous);
        setCount(data.count);
        setLoading(false);
      })
      .catch(error => {
        console.error('Greška pri dohvatanju problema:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProblems(`${API_URL}/problems/`);
  }, []);

  const handleNextPage = () => {
    if (nextPageUrl) {
      fetchProblems(nextPageUrl);
    }
  };

  const handlePrevPage = () => {
    if (prevPageUrl) {
      fetchProblems(prevPageUrl);
    }
  };

  return (
    <div>
      <h1>Arhiva Problema</h1>
      {loading ? (
        <p>Učitavanje...</p>
      ) : (
        <>
          <ul>
            {problems.map(problem => (
              <li key={problem.id}>
                <h2>{problem.title}</h2>
                <p>Objavljeno: {problem.published_date}</p>
                <a href={problem.problem_file_url} target="_blank" rel="noopener noreferrer">
                  Pogledaj problem
                </a>
              </li>
            ))}
          </ul>
          <div>
            <button onClick={handlePrevPage} disabled={!prevPageUrl}>
              Prethodna
            </button>
            <button onClick={handleNextPage} disabled={!nextPageUrl}>
              Sledeća
            </button>
          </div>
          <p>Ukupno problema: {count}</p>
        </>
      )}
    </div>
  );
};

export default ProblemList;
