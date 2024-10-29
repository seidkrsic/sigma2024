// LoginPage.jsx
import React, { useContext, useState } from 'react';
import './LoginPage.css';
import api from '../../services/api';
import AuthContext from '../../components/AuthContext/AuthContext';
import useScrollToTop from '../../components/useScrollToTop/useScrollToTop';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(username, password);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.register(username, email, password);
      if (response) {
        setIsLogin(true);
        setUsername('');
        setEmail('');
        setPassword('');
        setError('Registracija uspešna. Proverite svoj email da biste aktivirali nalog.');
      }
    } catch (err) {
      setError(err.message);
    }
  }; 

  useScrollToTop();
  window.scrollTo(0,0);

  return (
    <div className='LoginPage__container'>
      {isLogin ? (
        <form onSubmit={handleLogin} className='LoginPage__form'>
          <div className='LoginPage__input-container'>
            <input
              placeholder='Unesi korisničko ime'
              type='text'
              name='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className='LoginPage__input-container'>
            <input
              type='password'
              placeholder='Unesi lozinku'
              value={password}
              name='password'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="LoginPage__error-message">{error}</p>}
          <button type='submit' className='LoginPage__button'>Uloguj se</button>
          <p className="LoginPage__switch-text">
            Nemate nalog?{' '}
            <span onClick={() => setIsLogin(false)} className='LoginPage__switch-form'>
              Registrujte se
            </span>
          </p> 
          <Link to="/password-reset" className='LoginPage__link'>Zaboravili ste lozinku?</Link>
        </form>
      ) : (
        <form onSubmit={handleRegister} className='LoginPage__form'>
          <div className='LoginPage__input-container'>
            <input
              placeholder='Unesi korisničko ime'
              type='text'
              name='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className='LoginPage__input-container'>
            <input
              placeholder='Unesi email'
              type='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='LoginPage__input-container'>
            <input
              type='password'
              placeholder='Unesi lozinku'
              value={password}
              name='password'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="LoginPage__error-message">{error}</p>}
          <button type='submit' className='LoginPage__button'>Registrujte se</button>
          <p className="LoginPage__switch-text">
            Već imate nalog?{' '}
            <span onClick={() => setIsLogin(true)} className='LoginPage__switch-form'>
              Prijavite se
            </span>
          </p>
        </form>
      )} 

    </div>
  );
};

export default LoginPage;
