import axios from "axios";
import { toast } from "react-toastify";
import { configureStore } from "../store/store";

const axiosConfig = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });

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

axiosConfig.interceptors.response.use(
  (response) => {
    if (response.data?.errCode === 1) {
      toast(response.data.errMessage, { type: "error" });
    }
    return response;
  },
  (error) => {
    const message =
      error?.response?.data?.errMessage || error?.message || "Request error";
    toast(message, { type: "error" });
    return Promise.reject(error);
  }
);

export default axiosConfig;
