const BASE_URL = "http://localhost:3000/";

const SERVER_ENDPOINTS = {
  REGISTER: 'users/register',
  LOGIN: 'users/login',
  LOGOUT: 'users/logout',
  FORGOT_PASSWORD: 'users/forgot-password',
  RESET_PASSWORD: 'users/reset-password',
};

const EMAIL_REGEX =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

const PASS_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;

const path = {
  login: "users/login",
  logout: "users/logout",
};

export { BASE_URL, SERVER_ENDPOINTS, path, EMAIL_REGEX, PASS_REGEX };

