import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name, value, exp = 24) => {
  cookies.set(name, value, {
    path: "/",
  });
};

export const getCookie = (name) => {
  return cookies.get(name);
};

export const deleteCookie = (name) => {
  return cookies.remove(name, { path: "/" });
};
