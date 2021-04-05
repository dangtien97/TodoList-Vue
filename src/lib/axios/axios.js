import axios from "axios";
import store from "@/store";

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    store.dispatch("loader/sendRequest");
    const user = localStorage.getItem("user");
    if (user) {
      const token = JSON.parse(user).token;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    store.dispatch(
      "loader/setError",
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // store.commit("loader/END_REQUEST");
    store.dispatch("loader/endRequest");
    return response.data;
  },
  function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    store.dispatch(
      "loader/setError",
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
  }
);

export default instance;
