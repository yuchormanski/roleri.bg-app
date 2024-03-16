const reactEnvironment = import.meta.env.VITE_REACT_ENV;
const BASE_URL =
  reactEnvironment === "production"
    ? "https://roleri-bg-app.vercel.app/"
    : "http://localhost:3000/";

const SERVER_ENDPOINTS = {
  GET_ALL_NEWS: "news",

  GET_ALL_USERS: "users/",
  GET_USER: "users/get-user",
  UPDATE_USER: "users/update-user",
  EDIT_USER_ROLE: "users/edit-user-role",
  REGISTER: "users/register",
  LOGIN: "users/login",
  LOGOUT: "users/logout",
  FORGOT_PASSWORD: "users/forgot-password",
  RESET_PASSWORD: "users/reset-password",
  DELETE_USER: (userId) => `users/delete-user/${userId}`,

  GET_ALL_SKATERS: "skaters",
  GET_ALL_USER_SKATERS: "skaters/owned-by",
  GET_SKATER_BY_ID: (skaterId) => `skaters/get-one/${skaterId}`,
  ADD_SKATER: "skaters/add",
  EDIT_SKATER: "skaters/edit",
  DELETE_SKATER: (skaterId) => `skaters/delete/${skaterId}`,

  GET_ALL_OPTIONS: "options",
  GET_SKATES_OPTIONS: "options/skates",
  GET_PROTECTION_OPTIONS: "options/protections",
  GET_AGE_OPTIONS: "options/group-age",
  GET_SUBSCRIPTION_OPTIONS: "options/subscriptions",
  ADD_SKATES_OPTIONS: "options/add-skates",
  ADD_PROTECTION_OPTIONS: "options/add-protections",
  ADD_AGE_OPTIONS: "options/add-group-age",
  ADD_SUBSCRIPTION_OPTIONS: "options/add-subscriptions",
  EDIT_SKATES_OPTIONS: "options/edit-skates",
  EDIT_PROTECTION_OPTIONS: "options/edit-protections",
  EDIT_AGE_OPTIONS: "options/edit-group-age",
  EDIT_SUBSCRIPTION_OPTIONS: "options/edit-subscriptions",
  DELETE_SKATES_OPTIONS: (optionId) => `options/delete-skates/${optionId}`,
  DELETE_PROTECTION_OPTIONS: (optionId) =>
    `options/delete-protections/${optionId}`,
  DELETE_AGE_OPTIONS: (optionId) => `options/delete-group-age/${optionId}`,
  DELETE_SUBSCRIPTION_OPTIONS: (optionId) =>
    `options/delete-subscriptions/${optionId}`,

  GET_ALL_BOOKING: "bookings/",
  UNREGISTERED_BOOKING_USER: "bookings/unregistered-booking",
  REGISTERED_BOOKING_USER: "bookings/registered-booking",
  GET_ACTIVE_DAYS_ADMIN: "bookings/active-days-admin",
  GET_ACTIVE_DAYS_INDIVIDUAL: "bookings/active-days-individuals",
  GET_ACTIVE_DAYS_REGULAR: "bookings/active-days-regular",
  EDIT_ACTIVE_DAYS_INDIVIDUAL: "bookings/edit-active-days-individuals",
  EDIT_ACTIVE_DAYS_REGULAR: "bookings/edit-active-days-regular",
  REJECT_BOOKING: "bookings/reject-booking",
  ADD_EXCLUDED_OPTIONS: "bookings/add-excluded-options",
  GET_EXCLUDED_OPTIONS: "bookings/get-excluded-options",

  GET_ALL_LESSONS: "lessons",
  ADD_LESSON: "lessons/add-lesson",
  EDIT_LESSON: "lessons/edit-lesson",
  DELETE_LESSON: (lessonId) => `lessons/delete-lesson/${lessonId}`,
};

// const EMAIL_REGEX =
//   /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?: \.[a - z0 - 9!#$ %& '*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const EMAIL_REGEX =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

const PASS_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;

const PHONE_REGEX =
  /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/;

const path = {
  login: "users/login",
  logout: "users/logout",
};

const USER_LOCAL_STORAGE_KEY =
  "08180818a772caa4b9a0787a7e065311e1e83e676b5ce1e83e676b5c";

const USER_ROLE = {
  admin: "admin",
  user: "user",
  instructor: "instructor",
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
