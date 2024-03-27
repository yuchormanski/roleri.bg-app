import { Router } from "express";

import { endpoints } from "../environments/endPoints.js";
import { preloadOptions, userRole } from "../environments/constants.js";
import preloader from "../middlewares/preloader.js";
import {
  isUserGuest,
  isUserLogged,
  isUserRole,
} from "../middlewares/guards.js";
import {
  updateUserRoleSchema,
  updateUserSchema,
  validateLoginSchema,
  validateRegisterSchema,
  validateResetPasswordSchema,
} from "../util/validationSchemes.js";

import {
  addActiveContactUser,
  createResetLink,
  deleteUserById,
  editActiveContactUser,
  getAllActiveContactUsers,
  getAllUsers,
  getByIdActiveContactUsers,
  getUserById,
  removeActiveContactUser,
  resetUserPassword,
  updateUserById,
  updateUserRoleById,
  userLogin,
  userLogout,
  userRegister,
} from "../services/userService.js";

const userController = Router();

// Get all users
userController.get(
  endpoints.get_all_users,
  isUserLogged,
  preloader(getUserById, preloadOptions.getUserById),
  isUserRole([userRole.admin]),
  async (req, res, next) => {
    try {
      const currentUserId = req.user._id;
      const allUsers = await getAllUsers(currentUserId);

      res.status(200).json(allUsers);
    } catch (error) {
      next(error);
    }
  }
);

// Register
userController.post(endpoints.register, isUserGuest, async (req, res, next) => {
  try {
    const userData = req.body;

    await validateRegisterSchema.validateAsync(userData);
    const userWithToken = await userRegister(userData);

    res.status(201).json(userWithToken);
  } catch (error) {
    next(error);
  }
});

// Login
userController.post(endpoints.login, isUserGuest, async (req, res, next) => {
  try {
    const userData = req.body;

    await validateLoginSchema.validateAsync(userData);
    const userWithToken = await userLogin(userData);

    res.status(200).json(userWithToken);
  } catch (error) {
    next(error);
  }
});

// Logout
userController.get(endpoints.logout, isUserLogged, async (req, res, next) => {
  try {
    const userToken = req.userToken;

    const logoutMsg = await userLogout(userToken);

    res.status(200).json(logoutMsg);
  } catch (error) {
    next(error);
  }
});

// Forgot password
userController.post(
  endpoints.forgot_password,
  isUserGuest,
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const origin = req.get("origin");

      await createResetLink({ email, origin });

      res.status(200).json({ message: "Reset token sent successfully" });
    } catch (error) {
      next(error);
    }
  }
);

// Reset password
userController.put(
  endpoints.reset_password,
  isUserGuest,
  async (req, res, next) => {
    try {
      const userData = req.body;

      await validateResetPasswordSchema.validateAsync(userData);
      const userWithToken = await resetUserPassword(userData);

      res.status(200).json(userWithToken);
    } catch (error) {
      next(error);
    }
  }
);

// Get details for one user
userController.get(endpoints.get_user, isUserLogged, async (req, res, next) => {
  try {
    const userId = req.user._id;

    const userData = await getUserById(userId);

    res.status(200).json(userData);
  } catch (error) {
    next(error);
  }
});

// Update user
userController.put(
  endpoints.update_user,
  isUserLogged,
  async (req, res, next) => {
    try {
      const userId = req.user._id;
      const userData = req.body;

      await updateUserSchema.validateAsync(userData);
      const updatedUser = await updateUserById(userId, userData);

      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

// Change user role
userController.put(
  endpoints.edit_user_role,
  isUserLogged,
  preloader(getUserById, preloadOptions.getUserById),
  isUserRole([userRole.admin]),
  async (req, res, next) => {
    try {
      const userData = req.body;
      await updateUserRoleSchema.validateAsync(userData);

      const updateUserRole = await updateUserRoleById(userData);

      res.status(200).json(updateUserRole);
    } catch (error) {
      next(error);
    }
  }
);

// Delete user role
userController.delete(
  endpoints.delete_user,
  isUserLogged,
  preloader(getUserById, preloadOptions.getUserById),
  isUserRole([userRole.admin]),
  async (req, res, next) => {
    try {
      const userId = req.params.userId;

      const deletedMessage = await deleteUserById(userId);

      res.status(200).json(deletedMessage);
    } catch (error) {
      next(error);
    }
  }
);

// Get all active contact users (for individual lessons contact persons)
userController.get(
  endpoints.get_all_active_contact_user,
  async (req, res, next) => {
    try {

      const activeUsers = await getAllActiveContactUsers(userId);

      res.status(200).json(activeUsers);
    } catch (error) {
      next(error);
    }
  }
);

// Add active contact user (for individual lessons contact persons)
userController.post(
  endpoints.add_active_contact_user,
  isUserGuest,
  preloader(getUserById, preloadOptions.getUserById),
  isUserRole([userRole.admin]),
  async (req, res, next) => {
    try {
      const { userId } = req.body;

      await addActiveContactUser(userId);

      res.status(200).json({ message: "Success!" });
    } catch (error) {
      next(error);
    }
  }
);

// Edit active contact user (for individual lessons contact persons)
userController.put(
  endpoints.edit_active_contact_user,
  isUserGuest,
  preloader(getUserById, preloadOptions.getUserById),
  isUserRole([userRole.admin]),
  async (req, res, next) => {
    try {
      const { userId } = req.body;

      await editActiveContactUser(userId);

      res.status(200).json({ message: "Success!" });
    } catch (error) {
      next(error);
    }
  }
);

// Remove active contact user (for individual lessons contact persons)
userController.put(
  endpoints.remove_active_contact_user,
  isUserGuest,
  preloader(getUserById, preloadOptions.getUserById),
  isUserRole([userRole.admin]),
  async (req, res, next) => {
    try {
      const { userId } = req.body;

      await removeActiveContactUser(userId);

      res.status(200).json({ message: "Success!" });
    } catch (error) {
      next(error);
    }
  }
);

// Get active contact user by Id (for individual lessons contact persons)
userController.post(
  endpoints.get_active_contact_user,
  isUserGuest,
  preloader(getUserById, preloadOptions.getUserById),
  isUserRole([userRole.admin]),
  async (req, res, next) => {
    try {
      const { userId } = req.body;

      const activeUser = await getByIdActiveContactUsers(userId);

      res.status(200).json(activeUser);
    } catch (error) {
      next(error);
    }
  }
);

export { userController };