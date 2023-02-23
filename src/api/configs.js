import axios from "axios";

const api = import.meta.env.VITE_APP_API;
const path = import.meta.env.VITE_APP_PATH;
const authToken = document.cookie.replace(
  /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
  "$1"
);

const userRequest = axios.create({
  baseURL: api,
  headers: { post: { Authorization: authToken } },
});

const adminRequest = axios.create({
  baseURL: `${api}api/${path}`,
  headers: { common: { Authorization: authToken } },
});

export { userRequest, adminRequest, authToken };
