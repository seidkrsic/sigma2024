// ResetPassword.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../services/api.jsx';
import "./ResetPassword.css";

const ResetPassword = () => {
  const { uid, token } = useParams();
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    try {
      const response = await fetch(`${API_URL}/password-reset-confirm/${uid}/${token}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      if (data.message) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };
  window.scrollTo(0,0);
  return (
    <div className='ResetPassword__container'>
      {status === 'success' ? (
        <p className='ResetPassword__message success'>
          Lozinka je uspešno resetovana.
        </p>
      ) : status === 'error' ? (
        <p className='ResetPassword__message error'>
          Došlo je do greške prilikom resetovanja lozinke.
        </p>
      ) : (
        <form className='ResetPassword__form' onSubmit={handleSubmit}>
          <label className='ResetPassword__label'>
            Nova lozinka:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-label="Nova lozinka"
            />
          </label>
          <button type="submit" className='ResetPassword__button'>Resetuj lozinku</button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
