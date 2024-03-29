import bcrypt from "bcrypt";
import base64url from "base64url";

import { UserParent } from "../models/UserParent.js";
import { BlackListToken } from "../models/BlackListToken.js";

import { userRole } from "../environments/constants.js";
import { sendMail } from "../util/sendMail.js";
import { generateUserToken, signJwtToken } from "../util/signJwtToken.js";
import { emailTemplate } from "../util/emailTemplate.js";
import verifyJwtToken from "../util/verifyJwtToken.js";
import { BookingModel } from "../models/BookingModel.js";
import { LessonModel } from "../models/LessonModel.js";
import { SkaterModel } from "../models/SkaterModel.js";

// Get one user
const getAllUsers = async (userIdToExclude) =>
  UserParent.find({ _id: { $ne: userIdToExclude } }).select("-password -__v");

// Get one user
const getUserById = async (userId) =>
  UserParent.findById(userId).select("-password -__v");

// Update user
const updateUserById = async (userId, userData) =>
  UserParent.findByIdAndUpdate(userId, userData, {
    runValidators: true,
    new: true,
  }).select("-password -__v -updatedAt -createdAt");

// Update user role
const updateUserRoleById = async (userData) =>
  UserParent.findByIdAndUpdate(
    { _id: userData._id },
    { role: userData.role },
    { runValidators: true, new: true }
  ).select("-password -__v");

// Delete user
const deleteUserById = async (userId) => {
  // Find the user by ID
  const user = await UserParent.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  // Find and delete related bookings
  await BookingModel.deleteMany({ owner: userId });

  // Find and delete related lessons
  await LessonModel.deleteMany({ owner: userId });

  // Find and delete related skaters
  await SkaterModel.deleteMany({ owner: userId });

  // Finally, delete the user
  await UserParent.findByIdAndDelete(userId);

  return {
    success: true,
    message: "User and related models deleted successfully",
  };
};

// Register
const userRegister = async ({
  firstName,
  lastName,
  email,
  phone,
  role,
  password,
}) => {
  let currentUserRole = role || userRole.user;

  // Check if the user has already exist
  const userExistenceCheck = await UserParent.aggregate([
    {
      $facet: {
        count: [{ $count: "total" }],
        user: [{ $match: { email: email } }],
      },
    },
    {
      $project: {
        total: { $arrayElemAt: ["$count.total", 0] },
        user: { $arrayElemAt: ["$user", 0] },
      },
    },
  ]);

  const isFirstUserInDB = userExistenceCheck[0].total ? false : true; // If total is undefined isFirstUserInDB - true otherwise is false
  const isUserExist = userExistenceCheck[0].user ? true : false; // If user exists isUserExist is true otherwise is false

  if (isFirstUserInDB) {
    // No users exist, register the first user with admin role
    currentUserRole = userRole.admin;
  } else if (isUserExist) {
    // User already exists
    throw new Error("Email is already taken");
  }

  // Hash password
  const roundsBcrypt = Number(process.env.ROUNDS_BCRYPT);
  const hashedPassword = await bcrypt.hash(password, roundsBcrypt);

  // Create user
  const user = await UserParent.create({
    firstName,
    lastName,
    email,
    phone,
    role: currentUserRole,
    password: hashedPassword,
  });

  // Create token
  const userToken = await generateUserToken(user);

  // Add a reset template to be sent by email
  const htmlTemplate = emailTemplate({
    title: 'Registered user',
    header: 'Successful registered to Vertigo skates school',
    content: ['Enjoy the ride!'],
  });

  // Send mail to client
  sendMail(user.email, htmlTemplate);

  return createUserDetailsObject(user, userToken);
};

// Login
const userLogin = async ({ email, password }) => {
  // Check if the user with this email exists
  const user = await UserParent.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Validate password
  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    throw new Error("Invalid email or password");
  }

  // Create token
  const userToken = await generateUserToken(user);

  return createUserDetailsObject(user, userToken);
};

// Logout
const userLogout = async (userToken) => {
  await BlackListToken.create({ token: userToken });

  return { message: "Successful logout" };
};

// Create reset link
async function createResetLink({ email, origin }) {
  // Check if the user with this email exists
  const user = await UserParent.findOne({ email });
  if (!user) {
    throw new Error("Invalid email");
  }

  // Create temporary JWT token
  const temporaryToken = await signJwtToken(
    { _id: user._id },
    { expiresIn: "10m" }
  );
  // Encode JWT token to be used in url
  const encodedToken = base64url(temporaryToken);
  // Create URL used on front-end to reset password
  const resetLink = `${origin}/reset-password/${encodedToken}`;

  // Add a reset template to be sent by email
  const htmlTemplate = emailTemplate({
    resetLink,
    title: 'Reset Password',
    header: 'Възстанови парола',
    buttonText: 'Възстанови парола',
    content: [
      'За да възстановите своята парола моля последвайте линка.',
      'Линка е активен в рамките на 10 минути.'
    ],
  });

  // Send mail to client
  sendMail(user.email, htmlTemplate);

  return { resetLink };
}

// Reset password
async function resetUserPassword({ password, resetToken }) {
  const decodedToken = base64url.decode(resetToken);
  const userDetails = verifyJwtToken(decodedToken);

  // Check if the current token is already used
  const isTokenUsed = await BlackListToken.findOne({ token: decodedToken });
  if (isTokenUsed) {
    throw new Error("Reset link is already used");
  }

  // Add token to black list to be used only once
  await BlackListToken.create({ token: decodedToken });

  const user = await UserParent.findOne({ _id: userDetails._id });
  if (!user) {
    throw new Error("User does not exist");
  }

  // Hash password
  const roundsBcrypt = Number(process.env.ROUNDS_BCRYPT);
  const hashedPassword = await bcrypt.hash(password, roundsBcrypt);

  user.password = hashedPassword;
  await user.save();

  // Create token
  const userToken = await generateUserToken(user);

  return createUserDetailsObject(user, userToken);
}

// Helper functions

// Data to return to front-end
function createUserDetailsObject(user, userToken) {
  return {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    phone: user.phone,
    accessToken: userToken,
  };
}

export {
  getAllUsers,
  getUserById,
  updateUserById,
  userRegister,
  userLogin,
  userLogout,
  createResetLink,
  resetUserPassword,
  updateUserRoleById,
  deleteUserById,
};
