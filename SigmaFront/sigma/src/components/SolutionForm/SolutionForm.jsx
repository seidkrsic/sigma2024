import React, { useState } from 'react';
import api from '../../services/api.jsx';
import "./SolutionForm.css"

const SolutionForm = ({ problemId }) => {
  const [submittedSolution, setSubmittedSolution] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await api.submitSolution(problemId, parseInt(submittedSolution, 10));
      if (data.is_correct) {
        setMessage('Čestitamo! Vaše rešenje je tačno.');
      } else {
        setMessage('Vaše rešenje je primljeno, ali nije tačno.');
      }
      setSubmittedSolution('');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Vaše rešenje:
          <input
            type="number"
            value={submittedSolution}
            onChange={(e) => setSubmittedSolution(e.target.value)}
            required
          />
        </label>
        <button type="submit">Pošalji rešenje</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SolutionForm;
