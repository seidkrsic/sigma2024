import React, { createContext, useState, useEffect } from 'react';
import api from '../../services/api';


// Kreiramo kontekst za autentifikaciju
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0); 
  const [user, setUser] = useState(null);
  const [isPageListVisible, setIsPageListVisible] = useState(true);

  const togglePageListVisibility = () => {
    setIsPageListVisible(!isPageListVisible);
  };


useEffect(() => {
  // Initialize user from localStorage
  const storedUser = localStorage.getItem('user');
  const storedAccessToken = localStorage.getItem('access_token');
  if (storedUser && storedAccessToken) {
    setUser(JSON.parse(storedUser));
    setIsAuthenticated(true);
  }
}, []);


const login = async (username, password) => {
  try {
    const userData = await api.login(username, password);
    // const userData = await api.getUserProfile(); // Fetch user profile
    setUser(userData); // Set user data
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData)); // Store user data in localStorage
  } catch (error) {
    throw error;
  }
};


const logout = () => {
  api.handleLogout();
  setUser(null);
  setIsAuthenticated(false);
  localStorage.removeItem('user'); // Remove user data from localStorage

};


const ContextData  = { 
    isAuthenticated: isAuthenticated, 
    scrolled: scrolled,
    setScrolled: setScrolled,
    activeIndex: activeIndex, 
    setActiveIndex: setActiveIndex,
    login, 
    logout, 
    user, 
    togglePageListVisibility, 
    isPageListVisible, 
}

    // main return of component

    return (
          <AuthContext.Provider value={ContextData}>
            {children}
          </AuthContext.Provider>
          );
    };

export default AuthContext;