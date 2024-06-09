import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";

let TOKEN = null;

const persistRoot = localStorage.getItem("persist:root");
if (persistRoot) {
  try {
    const userState = JSON.parse(persistRoot).user;
    if (userState) {
      const currentUser = JSON.parse(userState).currentUser;
      if (currentUser) {
        TOKEN = currentUser.accessToken;
      }
    }
  } catch (error) {
    console.error("Error parsing localStorage data:", error);
  }
}

console.log("Token:", TOKEN);

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

const userRequest = axios.create({
  baseURL: BASE_URL,
});

if (TOKEN) {
  userRequest.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${TOKEN}`;
      console.log("Request Headers:", config.headers);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}

export { userRequest };
