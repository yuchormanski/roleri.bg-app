export const mainRoutes = {
  allRoute: "*",
  home: "/",
  users: "/users",
  lessons: "/lessons",
  skaters: "/skaters",
  options: "/options",
  bookings: "/bookings",
};

export const endpoints = {
  register: "/register",
  login: "/login",
  logout: "/logout",
  get_user: "/get-user",
  get_skater: "/get-skater",
  update_user: "/update-user",
  forgot_password: "/forgot-password",
  reset_password: "/reset-password",
  news: "/news",
  get_all_skaters: "/",
  get_all_user_skaters: "/owned-by",
  get_skater_by_id: "/get-one/:skaterId",
  add_skater: "/add",
  edit_skater: "/edit",
  delete_skater: "/delete/:skaterId",
  get_all_options: "/",
  get_skates_options: "/skates",
  get_protection_options: "/protections",
  get_level_options: "/group-levels",
  get_age_options: "/group-age",
  get_subscription_options: "/subscriptions",
  add_skates_options: "/add-skates",
  add_protection_options: "/add-protections",
  add_level_options: "/add-group-levels",
  add_age_options: "/add-group-age",
  add_subscription_options: "/add-subscriptions",
  edit_skates_options: "/edit-skates",
  edit_protection_options: "/edit-protections",
  edit_level_options: "/edit-group-levels",
  edit_age_options: "/edit-group-age",
  edit_subscription_options: "/edit-subscriptions",
  delete_skates_options: "/delete-skates/:optionId",
  delete_protection_options: "/delete-protections/:optionId",
  delete_level_options: "/delete-group-levels/:optionId",
  delete_age_options: "/delete-group-age/:optionId",
  delete_subscription_options: "/delete-subscriptions/:optionId",
  unregistered_booking_user: "/unregistered-booking",
};
