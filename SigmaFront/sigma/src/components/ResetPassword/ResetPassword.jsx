import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../services/api.jsx';


const ResetPassword = () => {
  const { uid, token } = useParams();
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${API_URL}/password-reset-confirm/${uid}/${token}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
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
    return <p>Lozinka je uspešno resetovana.</p>;
  } else if (status === 'error') {
    return <p>Došlo je do greške prilikom resetovanja lozinke.</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nova lozinka:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <button type="submit">Resetuj lozinku</button>
    </form>
  );
};

export default ResetPassword;
