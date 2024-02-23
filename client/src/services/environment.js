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
  GET_SKATES_OPTIONS: 'options/skates',
  GET_PROTECTION_OPTIONS: 'options/protections',
  GET_LEVEL_OPTIONS: 'options/group-levels',
  GET_AGE_OPTIONS: 'options/group-age',
  GET_SUBSCRIPTION_OPTIONS: 'options/subscriptions',
  ADD_SKATES_OPTIONS: 'options/add-skates',
  ADD_PROTECTION_OPTIONS: 'options/add-protections',
  ADD_LEVEL_OPTIONS: 'options/add-group-levels',
  ADD_AGE_OPTIONS: 'options/add-group-age',
  ADD_SUBSCRIPTION_OPTIONS: 'options/add-subscriptions',
  EDIT_SKATES_OPTIONS: 'options/edit-skates',
  EDIT_PROTECTION_OPTIONS: 'options/edit-protections',
  EDIT_LEVEL_OPTIONS: 'options/edit-group-levels',
  EDIT_AGE_OPTIONS: 'options/edit-group-age',
  EDIT_SUBSCRIPTION_OPTIONS: 'options/edit-subscriptions',
  DELETE_SKATES_OPTIONS: (optionId) => `options/delete-skates/${optionId}`,
  DELETE_PROTECTION_OPTIONS: (optionId) => `options/delete-protections/${optionId}`,
  DELETE_LEVEL_OPTIONS: (optionId) => `options/delete-group-levels/${optionId}`,
  DELETE_AGE_OPTIONS: (optionId) => `options/delete-group-age/${optionId}`,
  DELETE_SUBSCRIPTION_OPTIONS: (optionId) => `options/delete-subscriptions/${optionId}`,
};

const EMAIL_REGEX = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?: \.[a - z0 - 9!#$ %& '*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

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
