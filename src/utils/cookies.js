import Cookies from "universal-cookie";

const cookie = new Cookies();

export const getCookie = (key) => {
  return cookie.get(key);
};

export const removeCookie = (key) => {
  cookie.remove(key, { path: "/" });
};
