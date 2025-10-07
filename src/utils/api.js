import axios from "axios";

export const BASE_URL = "http://localhost:3000";

export const apiPaths = {
  login: "/login",
  viewProfile: "/profile/view",
};

export const appApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
