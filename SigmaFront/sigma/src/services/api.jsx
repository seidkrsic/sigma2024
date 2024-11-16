import axios from 'axios';

// const API_URL = 'http://127.0.0.1:8000/api';
export const API_URL = 'https://sigma-academy.me/api';

// Kreiramo Axios instancu
const instance = axios.create({
  baseURL: API_URL,
});

// Funkcije za dobijanje tokena iz localStorage
const getToken = () => localStorage.getItem('access_token');
const getRefreshToken = () => localStorage.getItem('refresh_token');

// Funkcija za odjavu
const handleLogout = () => {
  // Uklanjamo tokene i podatke korisnika iz localStorage
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');

  // Preusmeravamo na stranicu za prijavu
  window.location.href = '/'; // ili bilo koja druga ruta
};

// Funkcija za osvežavanje tokena
const refreshToken = async () => {
  const refresh_token = getRefreshToken();
  if (!refresh_token) {
    handleLogout();
    throw new Error('Nema dostupnog osvežavajućeg tokena');
  }
  try {
    const response = await axios.post(`${API_URL}/token/refresh/`, {
      refresh: refresh_token,
    });
    const { access } = response.data;
    localStorage.setItem('access_token', access);
    instance.defaults.headers['Authorization'] = `Bearer ${access}`;
    return access;
  } catch (error) {
    if (error.response) {
      // Ako server vrati 401 ili 403, osvježavajući token je nevažeći ili istekao
      if (error.response.status === 401 || error.response.status === 403) {
        handleLogout();
      }
    } else {
      // Greška na mreži (npr. nema internet veze)
      console.error('Greška na mreži prilikom osvježavanja tokena:', error);
      // Ovdje možemo odlučiti da ne radimo ništa ili da obavijestimo korisnika
    }
    throw error;
  }
};

// Interceptor za zahteve - dodajemo Authorization header
instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor za odgovore - osvežavamo token ako dobijemo 401 grešku
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        await refreshToken();
        return instance(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

// Funkcija za prijavu
const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/token/`, {
      username,
      password,
    });

    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);

    instance.defaults.headers['Authorization'] = `Bearer ${response.data.access}`;

    const userData = await getUserProfile();
    return userData;
  } catch (error) {
    if (error.response && error.response.data) {
      // Izvlačimo poruku o grešci iz odgovora sa servera
      const errorData = error.response.data;
      if (errorData.detail) {
        throw new Error(errorData.detail);
      } else {
        throw new Error('Pogrešno korisničko ime ili lozinka');
      }
    } else if (error.request) {
      // Zahtev je poslat, ali nema odgovora
      throw new Error('Greška na mreži, pokušajte ponovo kasnije');
    } else {
      // Došlo je do greške prilikom podešavanja zahteva
      throw new Error('Došlo je do greške, pokušajte ponovo kasnije');
    }
  }
};

// Funkcija za dobijanje korisničkog profila
const getUserProfile = async () => {
  try {
    const response = await instance.get('/profile/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Ostale API funkcije koriste `instance` umesto `axios`
const register = async (username, email, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/register/`,
      {
        username,
        email,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      const errorData = error.response.data;
      // Izvlačimo i formatiramo poruke o grešci
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

const getAllCourses = async () => {
  const response = await instance.get('/courses/');
  return response.data;
};

const getAllProfiles = async () => {
  const response = await instance.get('/profiles/');
  return response.data;
};

const getCourse = async (courseId) => {
  const response = await instance.get(`/courses/${courseId}/`);
  return response.data;
};

const searchCourses = async (params) => {
  const response = await instance.get('/courses/search/', {
    params,
    paramsSerializer: (params) => {
      return Object.entries(params)
        .map(([key, value]) =>
          Array.isArray(value)
            ? value.map((v) => `${key}=${encodeURIComponent(v)}`).join('&')
            : `${key}=${encodeURIComponent(value)}`
        )
        .join('&');
    },
  });
  return response.data;
};

const get = async (url) => {
  try {
    const response = await instance.get(url);
    return response;
  } catch (error) {
    throw error;
  }
};

const resendActivationEmail = async (email) => {
  try {
    const response = await axios.post(
      `${API_URL}/resend-activation-email/`,
      {
        email,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
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
  const response = await instance.get('/problem-of-the-week/');
  return response.data;
};


const submitSolution = async (problemId, submittedSolution, sessionId) => {
  try {
    const response = await instance.post('/submit-solution/', {
      problem: problemId,
      submitted_solution: submittedSolution,
      session_id: sessionId,
    });
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
    const response = await instance.get('/rankings/weekly/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getMonthlyRankings = async () => {
  try {
    const response = await instance.get('/rankings/monthly/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getAllTimeRankings = async () => {
  try {
    const response = await instance.get('/rankings/all-time/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateUserProfile = async (profileData) => {
  try {
    const formData = new FormData();
    if (profileData.name) {
      formData.append('name', profileData.name);
    }
    if (profileData.profile_picture) {
      formData.append('profile_picture', profileData.profile_picture);
    }

    const response = await instance.put('/profile/', formData, {
      headers: {
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
