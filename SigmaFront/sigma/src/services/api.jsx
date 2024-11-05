// api.js

import axios from 'axios';

// const API_URL = 'http://127.0.0.1:8000/api'; 
export const API_URL = 'https://sigma-academy.me/api';


const getToken = () => {
  return localStorage.getItem('access_token');
};

const getUserProfile = async () => {
  const token = getToken();
  if (!token) {
    return null;
  }

  try {
    const response = await axios.get(`${API_URL}/profile/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      handleLogout();
    }
    throw error;
  }
};

const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/token/`, {
      username,
      password,
    });

    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);

    const userData = await getUserProfile();

    // Redirect to home or dashboard page
    window.location.href = '/'; // Change to your desired route
    return userData;

  } catch (error) {
    if (error.response && error.response.data) {
      // Extract error message from backend response
      const errorData = error.response.data;
      if (errorData.detail) {
        throw new Error(errorData.detail);
      } else {
        throw new Error('Pogrešno korisničko ime ili lozinka');
      }
    } else if (error.request) {
      // Request was made but no response was received
      throw new Error('Greška na mreži, pokušajte ponovo kasnije');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error('Došlo je do greške, pokušajte ponovo kasnije');
    }
  }
};

const register = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register/`, {
      username,
      email,
      password,
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      const errorData = error.response.data;
      // Extract and format error messages
      let errorMessage = '';
      if (errorData.email) {
        errorMessage += `Email: ${errorData.email.join(' ')} `;
      }
      if (errorData.username) {
        errorMessage += `Korisničko ime: ${errorData.username.join(' ')} `;
      }
      if (errorData.password) {
        errorMessage += `Lozinka: ${errorData.password.join(' ')} `;
      }
      if (!errorMessage) {
        errorMessage = 'Registracija nije uspela. Pokušajte ponovo.';
      }
      throw new Error(errorMessage.trim());
    } else {
      throw new Error('Greška na mreži, pokušajte ponovo kasnije');
    }
  }
};

const handleLogout = async () => {
  const refreshToken = localStorage.getItem('refresh_token');
  const accessToken = localStorage.getItem('access_token');

  // Remove tokens from localStorage
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');

  // Inform the server
  try {
    await axios.post(
      `${API_URL}/logout/`,
      { refresh_token: refreshToken },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
  } catch (error) {
    console.error('Error during logout: ', error);
  }

  // Redirect to login page or home page
  window.location.href = '/login'; // or any other route
};

const getAllCourses = async () => {
  const response = await axios.get(`${API_URL}/courses/`);
  return response.data;
};

const getAllProfiles = async () => {
  const response = await axios.get(`${API_URL}/profiles/`);
  return response.data;
};

const getCourse = async (courseId) => {
  const response = await axios.get(`${API_URL}/courses/${courseId}/`);
  return response.data;
};

const searchCourses = async (params) => {
  const response = await axios.get(`${API_URL}/courses/search/`, {
    params,
    paramsSerializer: params => {
      return Object.entries(params)
        .map(([key, value]) =>
          Array.isArray(value)
            ? value.map(v => `${key}=${encodeURIComponent(v)}`).join('&')
            : `${key}=${encodeURIComponent(value)}`
        )
        .join('&');
    }
  });
  return response.data;
};

const get = async (url) => {
  try {
    const response = await axios.get(`${API_URL}${url}`);
    return response;
  } catch (error) {
    throw error;
  }
};

const resendActivationEmail = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/resend-activation-email/`, {
      email,
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      const errorData = error.response.data;
      throw new Error(errorData.error || 'Neuspešno slanje aktivacionog emaila.');
    } else {
      throw new Error('Greška na mreži, pokušajte ponovo kasnije');
    }
  }
};


const getCurrentProblem = async () => {
  try {
    const response = await axios.get(`${API_URL}/problem-of-the-week/`);
    return response.data;
  } catch (error) {
    throw error;
  }
}; 

const submitSolution = async (problemId, submittedSolution, timeTaken) => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('Morate biti ulogovani da biste poslali rešenje.');
  }

  try {
    const response = await axios.post(
      `${API_URL}/submit-solution/`,
      {
        problem: problemId,
        submitted_solution: submittedSolution,
        time_taken: timeTaken,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.detail || 'Došlo je do greške pri slanju rešenja.');
    } else {
      throw new Error('Greška na mreži, pokušajte ponovo kasnije.');
    }
  }
};


const getWeeklyRankings = async () => {
  try {
    const response = await axios.get(`${API_URL}/rankings/weekly/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getMonthlyRankings = async () => {
  try {
    const response = await axios.get(`${API_URL}/rankings/monthly/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getAllTimeRankings = async () => {
  try {
    const response = await axios.get(`${API_URL}/rankings/all-time/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


const updateUserProfile = async (profileData) => {
  const token = getToken();
  if (!token) {
    throw new Error('Morate biti ulogovani da biste ažurirali profil.');
  }

  try {
    const formData = new FormData();
    if (profileData.name) {
      formData.append('name', profileData.name);
    }
    if (profileData.profile_picture) {
      formData.append('profile_picture', profileData.profile_picture);
    }

    const response = await axios.put(`${API_URL}/profile/`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};




export default {
  getUserProfile,
  login,
  handleLogout,
  searchCourses,
  getAllCourses,
  getCourse,
  getAllProfiles,
  register,
  get,
  resendActivationEmail,
  getCurrentProblem,
  submitSolution,
  getWeeklyRankings, 
  getAllTimeRankings, 
  getMonthlyRankings,
  updateUserProfile,
};
