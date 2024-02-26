import axios from 'axios';

// Replace your server url here
const api =  axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 10_000,
})

// Register a new user with password confirmation
export const registerUser = async (username, password, repassword) => {
    try {
      if (password !== repassword) {
        throw new Error('Passwords do not match');
      }
  
      const response = await api.post('/api/register', { username, password, repassword });
      return response.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  };
  


  
  // Log in user
  export const loginUser = async (username, password) => {
    try {
      const response = await api.post('/api/login', { username, password });
      return response.data;
    } catch (error) {
      return Promise.reject(error.response.data);
    }
  };
  
  // Update user profile
  export const updateProfile = async (username, api_key, profileData) => {
    try {
      const response = await api.put('/api/update_profile', { username, api_key, ...profileData });
      return response.data;
    } catch (error) {
      return Promise.reject(error.response.data);
    }
  };

// Assuming your fineTune function looks like this:

export const fineTune = async (file, api_key) => {
    try {
      const formData = new FormData();
      formData.append('data_csv', file);
  
      const response = await api.post('/api/fine-tune', formData, {
        headers: {
          'Authorization': `${api_key}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // Check if 'data' field is present in the response
      if (response && response.data) {
        return response.data;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      return Promise.reject(error.response ? error.response.data : error.message);
    }
  };
  

export default api;