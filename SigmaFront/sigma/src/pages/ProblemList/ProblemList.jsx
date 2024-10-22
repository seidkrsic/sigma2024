// ProblemList.jsx
import React, { useState, useEffect } from 'react';
import { API_URL } from '../../services/api.jsx';
import "./ProblemList.css";

const ProblemList = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const pageSize = 10; // Veličina stranice

  const fetchProblems = (page = 1) => {
    setLoading(true);
    const url = `${API_URL}/problems/?page=${page}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log('data.count:', data.count);
        console.log('currentPage:', page);

        setProblems(data.results);
        setCurrentPage(page);
        const total = Math.ceil(data.count / pageSize);
        console.log('totalPages:', total);
        setTotalPages(total);

        setLoading(false);
      })
      .catch(error => {
        console.error('Greška pri dohvatanju problema:', error);
        setLoading(false);
      });
  };
  
  useEffect(() => {
    fetchProblems();
  }, []);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      fetchProblems(currentPage + 1);
    }
  };
  
  const handlePrevPage = () => {
    if (currentPage > 1) {
      fetchProblems(currentPage - 1);
    }
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
    <div className='ProblemList__container'>
      <h1 className="ProblemList__title">Arhiva Problema</h1>
      {loading ? (
        <div className="ProblemList__loading">
          <div className="spinner"></div>
          <p>Učitavanje...</p>
        </div>
      ) : (
        <>
          <table className="problem-list-table">
            <thead>
              <tr>
                <th>Datum objave</th>
                <th>Naziv</th>
                <th>Postavka (PDF)</th>
                <th>Rješenje (PDF)</th>
              </tr>
            </thead>
            <tbody>
              {problems.map(problem => (
                <tr key={problem.id}>
                  <td>{new Date(problem.published_date).toLocaleDateString()}</td>
                  <td>{problem.title}</td>
                  <td>
                    <a href={problem.problem_file_url} target="_blank" rel="noopener noreferrer" className="problem-link">
                      Problem
                    </a>
                  </td>
                  <td>
                    {problem.solution_file_url ? (
                      <a href={problem.solution_file_url} target="_blank" rel="noopener noreferrer" className="problem-link">
                        Rješenje
                      </a>
                    ) : (
                      <span className="no-solution">Nije dostupno</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
        </>
      )}
    </div>
  );
};

export default ProblemList;
