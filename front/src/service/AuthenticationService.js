import axios from "axios";

import { setCookie, getCookie, deleteCookie } from "../storage/Cookie";

class AuthenticationService {
  executeJwtAuthenticationService(accountEmail, accountPassword) {
    return axios.post("/api/v1/auth/login", {
      accountEmail,
      accountPassword,
    });
  }

  registerSuccessfulLoginForJwt(atk, rtk, type) {
    sessionStorage.setItem("userType", type);

    setCookie("RefreshToken", rtk);
    setCookie("AccessToken", atk);
    setCookie("islogin", true);

    this.setupAxiosInterceptors();
  }

  setupAxiosInterceptors() {
    axios.interceptors.request.use(
      (config) => {
        const AccessToken = getCookie("AccessToken");

        if (AccessToken && config.url !== "/api/v1/reissue") {
          config.headers["Authorization"] = "bearer " + AccessToken;
        } else if (config.url === "/api/v1/reissue") {
          config.headers["Authorization"] =
            "bearer " + getCookie("RefreshToken");
        }

        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (response) => {
        return response;
      },

      async (error) => {
        const originalRequest = error.config;

        if (
          error.response?.status === 401 &&
          error.response?.data.status === "UNAUTHORIZED"
        ) {
          if (401 === error.response.status) {
            return axios.get("/api/v1/reissue").then((response) => {
              if (response.status === 200) {
                setCookie("AccessToken", response.data.atk);

                originalRequest.headers[
                  "Authorization"
                ] = `bearer ${response.data.atk}`;

                return axios(originalRequest);
              }
            });
          }

          if (error.response?.status === 400) {
            console.log(error.response);
          }

          return Promise.reject(error);
        }
      }
    );
  }

  logout() {
    deleteCookie("AccessToken");
    deleteCookie("RefreshToken");
    deleteCookie("islogin");

    sessionStorage.removeItem("userType");
  }

  isUserLoggedIn() {
    const token = getCookie("AccessToken");

    if (token) {
      return true;
    }

    return false;
  }

  signService(
    accountEmail,
    accountName,
    accountPassword,
    accountDate,
    accountGender
  ) {
    return axios.post("/api/v1/auth/signUp", {
      accountEmail,
      accountName,
      accountPassword,
      accountDate,
      accountGender,
    });
  }
}

export default new AuthenticationService();
