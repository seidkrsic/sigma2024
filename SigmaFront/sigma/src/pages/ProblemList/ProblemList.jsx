import React, { useState, useEffect } from 'react';
import { API_URL } from '../../services/api.jsx';
import "./ProblemList.css";

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
    <div className='ProblemList__container'>
      <h1>Arhiva Problema</h1>
      {loading ? (
        <p>Učitavanje...</p>
      ) : (
        <>
          <table className="problem-list-table">
            <thead>
              <tr>
                <th>Date of the Problem</th>
                <th>Title</th>
                <th>View</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {problems.map(problem => (
                <tr key={problem.id}>
                  <td>{problem.published_date}</td>
                  <td>{problem.title}</td>
                  <td>
                    <a href={problem.problem_file_url} target="_blank" rel="noopener noreferrer">
                      View Problem
                    </a>
                  </td>
                  <td>
                    {problem.solution_file_url && (
                      <a href={problem.solution_file_url} target="_blank" rel="noopener noreferrer" className="download-btn">
                        DOWNLOAD PROBLEM
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination-buttons">
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
