import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./ActivateAccount.css" 

const ActivateAccount = () => {
  const { uid, token } = useParams();
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    fetch(`/api/activate/${uid}/${token}/`, {
      method: 'GET',
    })
      .then(response => {
        if (response.ok) {
          setStatus('success');
        } else {
          setStatus('error');
        }
      })
      .catch(error => {
        setStatus('error');
      });
  }, [uid, token]);

  if (status === 'loading') {
    return <p className='ActivateAccount'>Aktivacija naloga je u toku...</p>;
  } else if (status === 'success') {
    return <p className='ActivateAccount green'>Vaš nalog je uspešno aktiviran!</p>;
  } else {
    return <p className='ActivateAccount red'>Došlo je do greške prilikom aktivacije naloga.</p>;
  }
};

export default ActivateAccount;
