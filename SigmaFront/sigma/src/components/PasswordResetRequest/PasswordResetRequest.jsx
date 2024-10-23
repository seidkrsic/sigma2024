// PasswordResetRequest.jsx
import React, { useState } from 'react';
import { API_URL } from '../../services/api.jsx';
import "./PasswordResetRequest.css";

const PasswordResetRequest = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    try {
      const response = await fetch(`${API_URL}/password-reset/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
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
    <div className='PasswordResetRequest__container'>
      {status === 'success' ? (
        <p className='PasswordResetRequest__message success'>
          Email za resetovanje lozinke je poslat.
        </p>
      ) : status === 'error' ? (
        <p className='PasswordResetRequest__message error'>
          Došlo je do greške. Pokušajte ponovo.
        </p>
      ) : (
        <form className='PasswordResetRequest__form' onSubmit={handleSubmit}>
          <label className='PasswordResetRequest__label'>
            Unesite vašu email adresu:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email adresa"
            />
          </label>
          <button type="submit" className='PasswordResetRequest__button'>Pošalji</button>
        </form>
      )}
    </div>
  );
};

export default PasswordResetRequest;
