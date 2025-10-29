import axios from "axios";

export const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000" : "/api";

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
  userDetail: "/user/details",
};

export const appApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
