import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to inject access token from localStorage
api.interceptors.request.use((config) => {
  // Get token from localStorage
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { api };
