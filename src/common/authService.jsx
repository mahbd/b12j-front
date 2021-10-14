import jwtDecode from "jwt-decode";
import httpService from "./httpService";
import { apiEndpoint, keys, serverUrls, urls } from "../configuration";

export function logout(redirectURL = "/") {
  localStorage.removeItem(keys.ACCESS);
  localStorage.removeItem(keys.REFRESH);
  window.location = redirectURL;
}

export function getJwt() {
  return localStorage.getItem(keys.ACCESS);
}

export function setJwt(jwt) {
  return localStorage.setItem(keys.ACCESS, jwt);
}

export function setRefreshToken(refreshToken) {
  return localStorage.setItem(keys.REFRESH, refreshToken);
}

export const loginWithPassword = async (username, password) => {
  httpService
    .post(`${apiEndpoint}${serverUrls.login}/`, { username, password })
    .then((response) => {
      localStorage.setItem(keys.ACCESS, response.data.access);
      localStorage.setItem(keys.REFRESH, response.data.refresh);
      window.location = "/";
    })
    .catch((error) => {
      alert(error.response.data.errors);
    });
};

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(keys.ACCESS);
    return jwtDecode(jwt);
  } catch {
    return null;
  }
}

export function getRefreshToken() {
  return localStorage.getItem(keys.REFRESH);
}


export const refreshAccessToken = () => {
  httpService.post(`${apiEndpoint}${serverUrls.refreshToken}/`, { refresh: getRefreshToken() })
    .then(response => {
      localStorage.setItem(keys.ACCESS, response.data.access);
    }).catch(error => {
      logout(urls.login);
    alert(error.response.data.errors);
  });
};

export const verifyUpdateAccessToken = () => {
  httpService.post(`${apiEndpoint}${serverUrls.verifyToken}/`, {token: getJwt()})
    .then(response => {
      console.log("User is logged in", response.status);
    })
    .catch(error => {
      console.log(error);
      refreshAccessToken();
    })
}