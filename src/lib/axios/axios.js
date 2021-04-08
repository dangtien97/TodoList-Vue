import axios from "axios";
import store from "@/store";

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

function getAxiosErrorMessage(error) {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
}

instance.interceptors.request.use(
  (config) => {
    store.dispatch("loader/sendRequest");
    const user = localStorage.getItem("user");
    if (user) {
      const token = JSON.parse(user).token;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    store.dispatch("loader/setErrorHttp", getAxiosErrorMessage(error));
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    store.dispatch("loader/setSuccessResponse");
    return response.data;
  },
  (error) => {
    store.dispatch("loader/setErrorHttp", getAxiosErrorMessage(error));
    return Promise.reject(error);
  }
);

export default instance;
