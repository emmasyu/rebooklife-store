import axios from "axios";

const api = import.meta.env.VITE_APP_API;
const path = import.meta.env.VITE_APP_PATH;

const userRequest = axios.create({
  baseURL: api,
});

const adminRequest = axios.create({
  baseURL: `${api}api/${path}/admin`,
});

const guestRequest = axios.create({
  baseURL: `${api}api/${path}`,
});

userRequest.interceptors.request.use(
  (config) => {
    if (config.url !== "admin/signin") {
      const authToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)reBookToken\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      config.headers.Authorization = authToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
adminRequest.interceptors.request.use(
  (config) => {
    const authToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)reBookToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    config.headers.Authorization = authToken;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { userRequest, adminRequest, guestRequest };
