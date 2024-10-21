import React, { useState, useEffect } from 'react';
import { API_URL } from '../../services/api.jsx';
import "./ProblemList.css";

const ProblemList = () => {
  const [problems, setProblems] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(`${API_URL}/problems/`);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProblems = (page = 1) => {
    setLoading(true);
    const url = `${API_URL}/problems/?page=${page}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setProblems(data.results);
        setCount(data.count);
        setCurrentPage(page);
  
        const total = Math.ceil(data.count / 10);
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

if (totalPages === 1) {
    pagesToShow.push(1);
} else {
    pagesToShow.push(currentPage);
    if (currentPage < totalPages) {
        pagesToShow.push(currentPage + 1);
    }
}

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
                <th>Datum objave</th>
                <th>Naziv</th>
                <th>Postavka (PDF)</th>
                <th>Rješenje (PDF)</th>
              </tr>
            </thead>
            <tbody>
              {problems.map(problem => (
                <tr key={problem.id}>
                  <td>{problem.published_date}</td>
                  <td>{problem.title}</td>
                  <td>
                    <a href={problem.problem_file_url}  rel="noopener noreferrer">
                      Problem
                    </a>
                  </td>
                  <td>
                    {problem.solution_file_url && (
                      <a href={problem.solution_file_url} rel="noopener noreferrer">
                        Rješenje
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination-buttons">
            {currentPage > 1 && (
                <button onClick={handlePrevPage}>Prethodna</button>
            )}

            {pagesToShow.map(page => (
                <button
                key={page}
                onClick={() => fetchProblems(page)}
                className={page === currentPage ? 'active' : ''}
                >
                {page}
                </button>
            ))}

            {currentPage < totalPages && (
                <button onClick={handleNextPage}>Sledeća</button>
            )}
            </div>
          
        </>
      )}
    </div>
  );
};

export default ProblemList;
