// ProblemList.jsx
import React, { useState, useEffect } from 'react';
import { API_URL } from '../../services/api.jsx';
import "./ProblemList.css";
import useScrollToTop from '../../components/useScrollToTop/useScrollToTop.jsx';

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
        setProblems(data.results);
        setCurrentPage(page);
        const total = Math.ceil(data.count / pageSize);
        setTotalPages(total);
        setLoading(false);
      })
      .catch(error => {
        console.error('Greška pri dohvatanju problema:', error);
        setLoading(false);
      });

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  useScrollToTop();

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
          <div className="problem-tables">
            {problems.map(problem => (
              <table key={problem.id} className="problem-table">
                <thead>
                  <tr>
                    <th>Datum objave</th>
                    <th>Naziv</th>
                    <th>Postavka</th>
                    <th>Rješenje</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{new Date(problem.published_date).toLocaleDateString()}</td>
                    <td>{problem.title}</td>
                    <td>
                      <a href={problem.problem_file_url} rel="noopener noreferrer" className="problem-link" target="_blank">
                        Preuzmi problem
                      </a>
                    </td>
                    <td>
                      {problem.solution_file_url ? (
                        <a href={problem.solution_file_url} rel="noopener noreferrer" className="problem-link" target="_blank">
                          Preuzmi rješenje
                        </a>
                      ) : (
                        <span className="no-solution">Nije dostupno</span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            ))}
          </div>
          <div className="pagination-buttons">
            {currentPage > 1 && (
              <button onClick={handlePrevPage} className="pagination-button">
                Prethodna
              </button>
            )}
            <span className="current-page">{currentPage} od {totalPages}</span>
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
