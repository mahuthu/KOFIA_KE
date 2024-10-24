import axios from "axios";

//const BASE_URL = "http://localhost:5000/api/";
const BASE_URL = "https://kofia.co.ke/api/";


// Function to get token from localStorage
const getToken = () => {
  const user = localStorage.getItem("user");
  if (user) {
    const currentUser = JSON.parse(user);
    return currentUser.accessToken;
  }
  return null;
};

// Function to set token in localStorage
const setToken = (token) => {
  const user = localStorage.getItem("user");
  if (user) {
    const currentUser = JSON.parse(user);
    currentUser.accessToken = token;
    localStorage.setItem("user", JSON.stringify(currentUser));
  }
};

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

const userRequest = axios.create({
  baseURL: BASE_URL,
});

// Request interceptor to add token to headers
userRequest.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("Request Headers:", config.headers);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
userRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Token is expired or invalid:", error.response.data);
      // Try to refresh the token
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("Refresh token not available.");
        }
        const refreshResponse = await axios.post(`${BASE_URL}refreshToken`, {
          token: refreshToken,
        });
        const newToken = refreshResponse.data.accessToken;
        // Update the token in localStorage
        setToken(newToken);
        // Retry the original request with the new token
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return axios(error.config);
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
        // Handle refresh token failure (e.g., redirect to login)
        window.location.href = "/login"; // Adjust this as needed
      }
    }
    return Promise.reject(error);
  }
);

export { userRequest };
