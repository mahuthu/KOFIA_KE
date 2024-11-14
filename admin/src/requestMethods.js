import axios from "axios";

// const BASE_URL = "http://34.111.185.192/api/";
//const BASE_URL = "https://kofia.co.ke/api/";
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

  userRequest.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response && error.response.status === 401) {
        console.error("Token is expired or invalid:", error.response.data);
        // Try to refresh the token here
        try {
          const refreshResponse = await axios.post(`${BASE_URL}refreshToken`, {
            token: localStorage.getItem("refreshToken"),
          });
          TOKEN = refreshResponse.data.accessToken;
          // Update the token in localStorage
          const persistRoot = localStorage.getItem("persist:root");
          if (persistRoot) {
            const userState = JSON.parse(persistRoot).user;
            if (userState) {
              const currentUser = JSON.parse(userState).currentUser;
              if (currentUser) {
                currentUser.accessToken = TOKEN;
                localStorage.setItem(
                  "persist:root",
                  JSON.stringify({
                    ...JSON.parse(persistRoot),
                    user: JSON.stringify({ ...userState, currentUser }),
                  })
                );
              }
            }
          }
          // Retry the original request with the new token
          error.config.headers.Authorization = `Bearer ${TOKEN}`;
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
}

export { userRequest };
