import axios from "axios";
import { toast } from "react-toastify";
import { configureStore } from "../store/store";

const axiosConfig = axios.create({ baseURL: "http://localhost:8080" });

// Add a request interceptor
axiosConfig.interceptors.request.use(
  (config) => {
    const userAccessToken =
      configureStore.store.getState().userReducer.accessToken;

    if (userAccessToken) {
      config.headers["Authorization"] = `Bearer ${userAccessToken}`;
    }

    return config;
  },
  (error) => {
    toast(error, { type: "error" });
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosConfig.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.data?.errCode === 1) {
      toast(response.data.errMessage, { type: "error" });
    }
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const message =
      error?.response?.data?.errMessage || error?.message || "Request error";
    toast(message, { type: "error" });
    return Promise.reject(error);
  }
);

export default axiosConfig;
