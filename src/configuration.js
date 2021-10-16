const getEndpoint = () => {
  if (process.env.BACK_END) {
    return `https://${process.env.BACK_END}`
  } else if (document.domain === "localhost") return "http://127.0.0.1:8000";
  else if (document.domain === "b12j.herokuapp.com" || document.domain === "b12j-api.herokuapp.com") {
    return document.location.protocol + "//" + "b12j-api.herokuapp.com";
  } else return "https://api.b12j.ga";
};

export const endpoint = getEndpoint();
export const apiEndpoint = endpoint + "/api";

export const wssURL = () => {
  const protocol = document.location.protocol === "https:" ? "wss://" : "ws://";
  if (process.env.BACK_END) {
    return `wss://${process.env.BACK_END}`
  } else if (document.domain === "localhost") return protocol + "127.0.0.1:8000/ws";
  else if (document.domain === "b12j.herokuapp.com" || document.domain === "b12j-api.herokuapp.com") {
    return protocol + "b12j-api.herokuapp.com" + "/ws";
  }
  return protocol + "api.b12j.ga/ws";
};

const mainUrls = {
  chat: "/chat",
  home: "/home",
  contests: "/contests",
  others: "/others",
  problems: "/problems",
  restricted: "/restricted",
  submissions: "/submissions",
  tutorials: "/tutorials",
  users: "/users",
};

const subUrls = {
  addContest: `${mainUrls.contests}/add`,
  addProblem: `${mainUrls.problems}/add`,
  addTutorial: `${mainUrls.tutorials}/add`,
  confirmEmail: `${mainUrls.users}/activate`,
  editContest: `${mainUrls.contests}/edit/:id`,
  editProblem: `${mainUrls.problems}/edit`,
  editTutorial: `${mainUrls.tutorials}/edit`,
  emailSent: `${mainUrls.others}/email-sent`,
  login: `${mainUrls.users}/login`,
  logout: `${mainUrls.users}/logout`,
  profile: `${mainUrls.users}/profile`,
  register: `${mainUrls.users}/register`,
  registerSuccess: `${mainUrls.users}/register-success`,
  resetPassword: `${mainUrls.users}/reset-password`,
  resendActivationEmail: `${mainUrls.users}/resend-email`,
  test_cases: `${mainUrls.problems}/test_cases`,
  userList: `${mainUrls.users}/users`,
};

export const urls = {
  cf: "/cf",
  cfProblems: "cf/problems",
  cfStatics: "cf/statics",
  standing: "/contests/standing",
  ...mainUrls,
  ...subUrls,
};

export const serverUrls = {
  login: "/auth/jwt/create",
  refreshToken: "/auth/jwt/refresh",
  register: "/auth/users",
  resendActivationEmail: "/auth/users/resend_activation",
  resetPassword: "/auth/users/reset_password",
  confirmEmail: "/auth/users/activation",
  userList: "/auth/users",
  verifyToken: "/auth/jwt/verify",
  submissions: "/submissions",
  tutorials: "/tutorials",
  problems: "/problems",
  contests: "/contests",
  test_cases: "/test-cases"
};

export const keys = {
  ACCESS: "access",
  REFRESH: "refresh"
};
