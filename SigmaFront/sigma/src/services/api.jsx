import axios from 'axios';


// const API_URL = 'http://127.0.0.1:8000/api'; 

const API_URL = 'http://159.89.11.142/api'


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
        // Redirect to home or dashboard page
        window.location.href = '/'; // Change to your desired route
    } catch (error) {
        if (error.response) {
        // Server responded with a status other than 200 range
        throw new Error('Invalid username or password');
        } else if (error.request) {
        // Request was made but no response was received
        throw new Error('Network error, please try again later');
        } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error('An error occurred, please try again later');
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
        throw new Error(error.response.data.message || error.message);
    }
    };
      
      
const handleLogout = async () => {

    // Remove tokens from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    const refreshToken = localStorage.getItem('refresh_token');
    
    //  inform the server
    try {
        await axios.post(`${API_URL}/logout/`, { refresh_token: refreshToken });
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
          .map(([key, value]) => Array.isArray(value) ? value.map(v => `${key}=${encodeURIComponent(v)}`).join('&') : `${key}=${encodeURIComponent(value)}`)
          .join('&');
      }
    });
    return response.data;
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
};