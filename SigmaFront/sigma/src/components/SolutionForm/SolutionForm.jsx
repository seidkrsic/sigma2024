// SolutionForm.jsx
import React, { useState } from 'react';
import api from '../../services/api.jsx';
import "./SolutionForm.css";

const SolutionForm = ({ problemId, sessionId }) => {
  const [submittedSolution, setSubmittedSolution] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!sessionId) {
      setMessage('Došlo je do greške. Pokušajte ponovo učitati stranicu.');
      return;
    }

    try {
      const data = await api.submitSolution(problemId, parseInt(submittedSolution, 10), sessionId);
      if (data.is_correct) {
        setMessage('Čestitamo! Vaše rešenje je tačno.');
      } else {
        setMessage('Vaše rešenje je primljeno, ali nije tačno.');
      }
      setSubmittedSolution('');
    } catch (error) {
      setMessage(error.message || 'Došlo je do greške pri slanju rešenja.');
    }
  };

  return (
    <div className="SolutionForm__container">
      <h2 className="SolutionForm__title">Pošalji svoje rešenje</h2>
      <form onSubmit={handleSubmit} className="SolutionForm__form">
        <div className="SolutionForm__field">
          <label htmlFor="solution" className="SolutionForm__label">Vaše rešenje:</label>
          <input
            type="number"
            id="solution"
            value={submittedSolution}
            onChange={(e) => setSubmittedSolution(e.target.value)}
            required
            className="SolutionForm__input"
            placeholder="Unesi svoje rešenje ovdje..."
          />
        </div>
        <button type="submit" className="SolutionForm__button">Pošalji rešenje</button>
      </form>
      {message && <p className="SolutionForm__message">{message}</p>}
    </div>
  );
};

export default SolutionForm;
