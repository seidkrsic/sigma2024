// ActivateAccount.js
import "./ActivateAccount.css"  
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

const ActivateAccount = () => {
  const { uid, token } = useParams();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const activateAccount = async () => {
      try {
        const response = await api.get(`/activate/${uid}/${token}/`);
        setMessage(response.data.message);
      } catch (err) {
        if (err.response && err.response.data) {
          setError(err.response.data.error);
        } else {
          setError('Greška pri aktivaciji naloga. Pokušajte ponovo.');
        }
      }
    };

    activateAccount();
  }, [uid, token]);

  return (
    <div className="ActivateAccount">
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
      {/* Optionally, add a link to the login page */}
    </div>
  );
};

export default ActivateAccount;
