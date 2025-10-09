import axios from "axios";

export const BASE_URL = "http://localhost:3000";

export const apiPaths = {
  login: "/login",
  signUp: "/signup",
  logout: "/logout",
  viewProfile: "/profile/view",
  feed: "/user/feed",
  updateProfile: "/profile/update",
  connections: "/user/connections",
  requests: "/user/request/received",
  reviewRequest: "/request/review",
  sendRequest: "/request/send",
};

export const appApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
