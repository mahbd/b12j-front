const getEndpoint = () => {
  if (document.domain === "localhost") return "http://127.0.0.1:8000";
  else if (document.domain === "b12j-dev.herokuapp.com" || document.domain === "b12j.herokuapp.com") {
    return document.location.protocol + "//" + document.location.host;
  } else return "https://api.b12j.ga";
};

export const endpoint = getEndpoint();
export const apiEndpoint = endpoint + "/api";

export const wssURL = () => {
  const protocol = document.location.protocol === "https:" ? "wss://" : "ws://";
  if (document.domain === "localhost") return protocol + "127.0.0.1:8000/ws";
  else if (document.domain === "b12j-dev.herokuapp.com" || document.domain === "b12j.herokuapp.com") {
    return protocol + document.location.host + "/ws";
  }
  return protocol + "api.b12j.ga/ws";
};

const mainUrls = {
  chat: "/chat",
  home: "/home",
  contests: "/contests",
  problems: "/problems",
  restricted: "/restricted",
  submissions: "/submissions",
  tutorials: "/tutorials",
  users: "/users"
};

const subUrls = {
  addProblem: `${mainUrls.problems}/add`,
  editProblem: `${mainUrls.problems}/edit`,
  addTutorial: `${mainUrls.tutorials}/add`,
  editTutorial: `${mainUrls.tutorials}/edit`,
  login: `${mainUrls.users}/login`,
  logout: `${mainUrls.users}/logout`,
  profile: `${mainUrls.users}/profile`,
  register: `${mainUrls.users}/register`,
  registerSuccess: `${mainUrls.users}/register-success`,
  resetPassword: `${mainUrls.users}/reset-password`,
  resendActivationEmail: `${mainUrls.users}/resend-email`,
  userList: `${mainUrls.users}/users`,
};

export const urls = {
  cf: "/cf",
  cfProblems: "cf/problems",
  cfStatics: "cf/statics",
  addEditContest: "/restricted/add-edit-contest",
  standing: "/contests/standing",

  ...mainUrls,
  ...subUrls
};

export const serverUrls = {
  login: "/auth/jwt/create",
  refreshToken: "/auth/jwt/refresh",
  register: "/auth/users",
  resendActivationEmail: "/auth/users/resend_activation",
  userList: "/auth/users",
  verifyToken: "/auth/jwt/verify",
};

export const firebaseConfig = {
  apiKey: "AIzaSyB9n-TJY1hy49WoECQH7fZXlxA7lKI2VH4",
  authDomain: "b12j-mah.firebaseapp.com",
  databaseURL: "https://b12j-mah.firebaseio.com",
  projectId: "b12j-mah",
  storageBucket: "b12j-mah.appspot.com",
  messagingSenderId: "704405925886",
  appId: "1:704405925886:web:2066da3c25584a7ed4daaf",
  measurementId: "G-XE9M4QRX4J"
};

export const keys = {
  ACCESS: "access",
  REFRESH: "refresh"
};
