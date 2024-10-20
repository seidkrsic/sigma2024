import React, { useState } from 'react';
import { API_URL } from '../../services/api.jsx';
import "./PasswordResetRequest.css" 

const PasswordResetRequest = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${API_URL}/password-reset/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          setStatus('success');
        } else {
          setStatus('error');
        }
      })
      .catch(error => {
        setStatus('error');
      });
  };

  if (status === 'success') {
    return <p className='PasswordResetForm'>Email za resetovanje lozinke je poslat.</p>;
  } else if (status === 'error') {
    return <p className='PasswordResetForm'>Došlo je do greške. Pokušajte ponovo.</p>;
  }

  return (
    <form className='PasswordResetForm' onSubmit={handleSubmit}>
      <label>
        Unesite vašu email adresu:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <button type="submit">Pošalji</button>
    </form>
  );
};

export default PasswordResetRequest;
