import React, { useState, useEffect } from 'react';
import SolutionForm from '../../components/SolutionForm/SolutionForm.jsx';
import api from '../../services/api.jsx';
import "./ProblemOfTheWeek.css" 

const ProblemOfTheWeek = () => {
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem('access_token');
      setIsAuthenticated(!!token);
    };

    const fetchProblem = async () => {
      try {
        const data = await api.getCurrentProblem();
        setProblem(data);
      } catch (error) {
        setError('Trenutno nema aktivnog problema.');
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
    fetchProblem();
  }, []);

  if (loading) {
    return <p>Učitavanje...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!problem) {
    return <p>Trenutno nema aktivnog problema.</p>;
  }

  return (
    <div>
      <h1>{problem.title}</h1>
      <div>
        {problem.problem_file_url ? (
          <div>
            <p>Pogledajte problem ovde:</p>
            <a href={problem.problem_file_url}  rel="noopener noreferrer">
              {problem.title}
            </a>
          </div>
        ) : (
          <p>Problem nije dostupan.</p>
        )}
      </div>
      {isAuthenticated ? (
        <SolutionForm problemId={problem.id} />
      ) : (
        <p>
          Morate biti <a href="/login">ulogovani</a> da biste poslali rešenje.
        </p>
      )}
    </div>
  );
};

export default ProblemOfTheWeek;
