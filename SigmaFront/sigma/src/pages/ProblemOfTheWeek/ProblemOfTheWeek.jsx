// ProblemOfTheWeek.jsx
import React, { useState, useEffect } from 'react';
import SolutionForm from '../../components/SolutionForm/SolutionForm.jsx';
import api from '../../services/api.jsx';
import "./ProblemOfTheWeek.css";
import useScrollToTop from '../../components/useScrollToTop/useScrollToTop.jsx';

const ProblemOfTheWeek = () => {
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [sessionId, setSessionId] = useState(null); // Added to store session_id

  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem('access_token');
      setIsAuthenticated(!!token);
    };

    const fetchProblem = async () => {
      try {
        const data = await api.getCurrentProblem();
        setProblem(data.problem); 
        setSessionId(data.session_id);
      } catch (error) {
        setError('Trenutno nema aktivnog problema.');
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
    fetchProblem();
  }, []);

  useScrollToTop();

  if (loading) {
    return (
      <div className="ProblemOfTheWeek__loading">
        <div className="spinner"></div>
        <p>Učitavanje...</p>
      </div>
    );
  }

  if (error) {
    return <div className="ProblemOfTheWeek__error"><p>{error}</p></div>;
  }

  if (!problem) {
    return <div className="ProblemOfTheWeek__no-problem"><p>Trenutno nema aktivnog problema.</p></div>;
  }

  return (
    <div className='ProblemOfTheWeek__container'>
      <h1 className='ProblemOfTheWeek__title'>{problem.title}</h1>
      <div className='ProblemOfTheWeek__content'>
        {problem.problem_file_url ? (
          <div className='ProblemOfTheWeek__problem-file'>
            <p>Pogledajte problem ovdje:</p>
            <a
              href={problem.problem_file_url}
              rel="noopener noreferrer"
              className='ProblemOfTheWeek__link'
            >
              {problem.title + ".pdf"}
            </a>
          </div>
        ) : (
          <p>Problem nije dostupan.</p>
        )}
      </div>
      <div className='ProblemOfTheWeek__solution-section'>
        {isAuthenticated ? (
          <SolutionForm problemId={problem.id} sessionId={sessionId} />
        ) : (
          <p>
            Morate biti <a href="/login" className='ProblemOfTheWeek__login-link'>ulogovani</a> da biste poslali rešenje.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProblemOfTheWeek;
