import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
});

userRequest.interceptors.request.use(
  config => {
    const persistRoot = localStorage.getItem("persist:root");
    if (persistRoot) {
      try {
        const userState = JSON.parse(persistRoot).user;
        if (userState) {
          const currentUser = JSON.parse(userState).currentUser;
          if (currentUser) {
            const token = currentUser.accessToken;
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
