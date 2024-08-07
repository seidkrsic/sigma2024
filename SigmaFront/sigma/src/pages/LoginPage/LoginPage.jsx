import React, { useContext, useState } from 'react';
import './LoginPage.css';
import api from '../../services/api';
import AuthContext from '../../components/AuthContext/AuthContext';
import useScrollToTop from '../../components/useScrollToTop/useScrollToTop';

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
      console.log(response);
      if (response) {
        setIsLogin(true);
        setError(response.message);
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
            {/* <label>Korisničko ime:</label> */}
            <input
              
              placeholder='unesi korisničko ime'
              type='text'
              name='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className='LoginPage__input-container'>
            {/* <label>Lozinka:</label> */}
            <input
              type='password'
              placeholder='unesi lozinku'
              value={password}
              name='password'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p>{error}</p>}
          <button type='submit'>Uloguj se</button>
          <p id="switch-form__text">
            Nemate nalog?{' '}
            <span onClick={() => setIsLogin(false)} className='switch-form'>
              Registrujte se
            </span>
          </p>
        </form>
      ) : (
        <form onSubmit={handleRegister} className='LoginPage__form'>
          <div className='LoginPage__input-container'>
            {/* <label>Korisničko ime:</label> */}
            <input
              
              placeholder='unesi korisničko ime'
              type='text'
              name='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className='LoginPage__input-container'>
            {/* <label>Email:</label> */}
            <input
              placeholder='unesi email'
              type='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='LoginPage__input-container'>
            {/* <label>Lozinka:</label> */}
            <input
              type='password'
              placeholder='unesi lozinku'
              value={password}
              name='password'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p>{error}</p>}
          <button type='submit'>Registrujte se</button>
          <p id='switch-form__text'>
            Već imate nalog?{' '}
            <span onClick={() => setIsLogin(true)} className='switch-form'>
              Prijavite se
            </span>
          </p>
        </form>
      )}
    </div>
  );
};

export default LoginPage;
