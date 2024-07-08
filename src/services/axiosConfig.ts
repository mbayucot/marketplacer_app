import axios from "axios";
import { useAuthStore } from "../store/useAuthStore.ts";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Set up Axios interceptor
const { getState } = useAuthStore;

apiClient.interceptors.request.use(
  (config) => {
    const token = getState().token;
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default apiClient;
