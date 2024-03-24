export const mainRoutes = {
  allRoute: "*",
  home: "/",
  users: "/users",
  lessons: "/lessons",
  skaters: "/skaters",
  options: "/options",
  bookings: "/bookings",
  coach: "/coach",
};

export const endpoints = {
  // main path: /
  news: "/news",

  // main path: /users/
  get_all_users: "/",
  register: "/register",
  login: "/login",
  logout: "/logout",
  forgot_password: "/forgot-password",
  reset_password: "/reset-password",
  get_user: "/get-user",
  update_user: "/update-user",
  edit_user_role: "/edit-user-role",
  delete_user: "/delete-user/:userId",

  // main path: /lessons/
  get_all_lessons: "/",
  get_all_lessons_without_individual: "/get-all-lessons-without-individual",
  add_lesson: "/add-lesson",
  edit_lesson: "/edit-lesson",
  delete_lesson: "/delete-lesson/:lessonId",

  // main path: /skaters/
  get_all_skaters: "/",
  get_all_user_skaters: "/owned-by",
  get_skater_by_id: "/get-one/:skaterId",
  add_skater: "/add",
  edit_skater: "/edit",
  delete_skater: "/delete/:skaterId",

  // main path: /options/
  get_all_options: "/",
  get_skates_options: "/skates",
  get_protection_options: "/protections",
  get_age_options: "/group-age",
  get_subscription_options: "/subscriptions",
  add_skates_options: "/add-skates",
  add_protection_options: "/add-protections",
  add_age_options: "/add-group-age",
  add_subscription_options: "/add-subscriptions",
  edit_skates_options: "/edit-skates",
  edit_protection_options: "/edit-protections",
  edit_age_options: "/edit-group-age",
  edit_subscription_options: "/edit-subscriptions",
  delete_skates_options: "/delete-skates/:optionId",
  delete_protection_options: "/delete-protections/:optionId",
  delete_age_options: "/delete-group-age/:optionId",
  delete_subscription_options: "/delete-subscriptions/:optionId",

  // main path: /bookings/
  get_all_booking: "/",
  unregistered_booking_user: "/unregistered-booking",
  registered_booking_user: "/registered-booking",
  get_active_days_admin: "/active-days-admin",
  get_active_days_individual: "/active-days-individuals",
  get_active_days_regular: "/active-days-regular",
  edit_active_days_individual: "/edit-active-days-individuals",
  edit_active_days_regular: "/edit-active-days-regular",
  reject_booking: "/reject-booking",
  add_excluded_options: "/add-excluded-options",
  get_excluded_options: "/get-excluded-options",

  // main path: /coach/
  get_coach_lessons: "/get-coach-lessons",
  get_coach_lessons_equipment: "/get-coach-lessons-equipment",
  edit_coach_is_present: "/edit-coach-is-present",
  edit_coach_is_not_present: "/edit-coach-is-not-present",
  edit_coach_is_paid: "/edit-coach-is-paid",
  edit_coach_is_not_paid: "/edit-coach-is-not-paid",
  add_coach_note: "/add-coach-note",
  edit_coach_note: "/edit-coach-note",
};
