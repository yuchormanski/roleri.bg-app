const reactEnvironment = import.meta.env.VITE_REACT_ENV;
const BASE_URL = reactEnvironment === 'production' ? "https://roleri-bg-app.vercel.app/" : "http://localhost:3000/";

const SERVER_ENDPOINTS = {
  REGISTER: "users/register",
  LOGIN: "users/login",
  LOGOUT: "users/logout",
  GET_USER: "users/get-user",
  UPDATE_USER: "users/update-user",
  FORGOT_PASSWORD: "users/forgot-password",
  RESET_PASSWORD: "users/reset-password",
  GET_ALL_SKATERS: "skaters",
  ADD_SKATER: "skaters/add",
  EDIT_SKATER: "skaters/edit",
  DELETE_SKATER: (skaterId) => `skaters/delete/${skaterId}`,
  GET_ALL_LESSONS: "lessons",
  GET_ALL_NEWS: "news",
  GET_ALL_OPTIONS: 'options',
  ADD_OPTIONS: 'options/add',
};

const EMAIL_REGEX = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

const PASS_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;

const PHONE_REGEX = /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/;

const path = {
  login: "users/login",
  logout: "users/logout",
};

const USER_LOCAL_STORAGE_KEY = "08180818a772caa4b9a0787a7e065311e1e83e676b5ce1e83e676b5c";

const USER_ROLE = {
  admin: 'admin',
  user: 'user',
  instructor: 'instructor',
};

export {
  BASE_URL,
  SERVER_ENDPOINTS,
  path,
  EMAIL_REGEX,
  PASS_REGEX,
  PHONE_REGEX,
  USER_LOCAL_STORAGE_KEY,
  USER_ROLE,
};
