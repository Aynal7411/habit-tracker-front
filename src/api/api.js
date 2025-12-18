import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const token = JSON.parse(storedUser).token;
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (err) {
      console.warn("Failed to attach token:", err);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Response interceptor to handle global errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API response error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
