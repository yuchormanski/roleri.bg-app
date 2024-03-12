import { Router } from "express";

import { isUserLogged, isUserRole } from "../middlewares/guards.js";
import preloader from "../middlewares/preloader.js";
import { endpoints } from "../environments/endPoints.js";
import { preloadOptions, userRole } from "../environments/constants.js";

import { getUserById } from "../services/userService.js";
import {
  getAgeOptions,
  getAllOptionsSkatesData,
  getProtectionOptions,
  getSkatesOptions,
  getSubscriptionOptions,
  addSkatesOptions,
  addProtectionOptions,
  addAgeOptions,
  addSubscriptionOptions,
  editSkatesOptions,
  editProtectionOptions,
  editAgeOptions,
  editSubscriptionOptions,
  deleteSkatesOptions,
  deleteProtectionOptions,
  deleteAgeOptions,
  deleteSubscriptionOptions,
} from "../services/optionService.js";

const optionController = Router();

// Get all options for skates
optionController.get(endpoints.get_all_options, async (req, res, next) => {
  try {
    const optionSkaterData = await getAllOptionsSkatesData();

    res.status(200).json(optionSkaterData);
  } catch (error) {
    next(error);
  }
});

// Get skates options
optionController.get(
  endpoints.get_skates_options,
  isUserLogged,
  async (req, res, next) => {
    try {
      const skatesOptions = await getSkatesOptions();

      res.status(200).json(skatesOptions);
    } catch (error) {
      next(error);
    }
  }
);

// Get protection options
optionController.get(
  endpoints.get_protection_options,
  isUserLogged,
  async (req, res, next) => {
    try {
      const protectionOptions = await getProtectionOptions();

      res.status(200).json(protectionOptions);
    } catch (error) {
      next(error);
    }
  }
);

// Get age options
optionController.get(
  endpoints.get_age_options,
  isUserLogged,
  async (req, res, next) => {
    try {
      const protectionOptions = await getAgeOptions();

      res.status(200).json(protectionOptions);
    } catch (error) {
      next(error);
    }
  }
);

// Get subscription options
optionController.get(
  endpoints.get_subscription_options,
  isUserLogged,
  async (req, res, next) => {
    try {
      const protectionOptions = await getSubscriptionOptions();

      res.status(200).json(protectionOptions);
    } catch (error) {
      next(error);
    }
  }
);

// Create skates options
optionController.post(
  endpoints.add_skates_options,
  isUserLogged,
  preloader(getUserById, preloadOptions.getUserById),
  isUserRole(userRole.admin),
  async (req, res, next) => {
    try {
      const skatesData = req.body;

      const newOption = await addSkatesOptions(skatesData);

      res.status(201).json(newOption);
    } catch (error) {
      next(error);
    }
  }
);

// Create protection options
optionController.post(
  endpoints.add_protection_options,
  isUserLogged,
  preloader(getUserById, preloadOptions.getUserById),
  isUserRole(userRole.admin),
  async (req, res, next) => {
    try {
      const protectionData = req.body;

      const newOption = await addProtectionOptions(protectionData);

      res.status(201).json(newOption);
    } catch (error) {
      next(error);
    }
  }
);

// Create age options
optionController.post(
  endpoints.add_age_options,
  isUserLogged,
  preloader(getUserById, preloadOptions.getUserById),
  isUserRole(userRole.admin),
  async (req, res, next) => {
    try {
      const ageData = req.body;

      const newOption = await addAgeOptions(ageData);

      res.status(201).json(newOption);
    } catch (error) {
      next(error);
    }
  }
);

// Create subscription options
optionController.post(
  endpoints.add_subscription_options,
  isUserLogged,
  preloader(getUserById, preloadOptions.getUserById),
  isUserRole(userRole.admin),
  async (req, res, next) => {
    try {
      const subscriptionData = req.body;

      const newOption = await addSubscriptionOptions(subscriptionData);

      res.status(201).json(newOption);
    } catch (error) {
      next(error);
    }
  }
);

// Update skates options
optionController.put(
  endpoints.edit_skates_options,
  isUserLogged,
  preloader(getUserById, preloadOptions.getUserById),
  isUserRole(userRole.admin),
  async (req, res, next) => {
    try {
      const skatesData = req.body;

      const updatedOption = await editSkatesOptions(skatesData);

      res.status(200).json(updatedOption);
    } catch (error) {
      next(error);
    }
  }
);

// Update protection options
optionController.put(
  endpoints.edit_protection_options,
  isUserLogged,
  preloader(getUserById, preloadOptions.getUserById),
  isUserRole(userRole.admin),
  async (req, res, next) => {
    try {
      const protectionData = req.body;

      const updatedOption = await editProtectionOptions(protectionData);

      res.status(200).json(updatedOption);
    } catch (error) {
      next(error);
    }
  }
);

// Update age options
optionController.put(
  endpoints.edit_age_options,
  isUserLogged,
  preloader(getUserById, preloadOptions.getUserById),
  isUserRole(userRole.admin),
  async (req, res, next) => {
    try {
      const ageData = req.body;

      const updatedOption = await editAgeOptions(ageData);

      res.status(200).json(updatedOption);
    } catch (error) {
      next(error);
    }
  }
);

// Update subscription options
optionController.put(
  endpoints.edit_subscription_options,
  isUserLogged,
  preloader(getUserById, preloadOptions.getUserById),
  isUserRole(userRole.admin),
  async (req, res, next) => {
    try {
      const subscriptionData = req.body;

      const updatedOption = await editSubscriptionOptions(subscriptionData);

      res.status(200).json(updatedOption);
    } catch (error) {
      next(error);
    }
  }
);

// Delete skates options
optionController.delete(
  endpoints.delete_skates_options,
  isUserLogged,
  preloader(getUserById, preloadOptions.getUserById),
  isUserRole(userRole.admin),
  async (req, res, next) => {
    try {
      const optionId = req.params.optionId;

      const deletedOption = await deleteSkatesOptions(optionId);

      res.status(200).json(deletedOption);
    } catch (error) {
      next(error);
    }
  }
);

// Delete protection options
optionController.delete(
  endpoints.delete_protection_options,
  isUserLogged,
  preloader(getUserById, preloadOptions.getUserById),
  isUserRole(userRole.admin),
  async (req, res, next) => {
    try {
      const optionId = req.params.optionId;

      const deletedOption = await deleteProtectionOptions(optionId);

      res.status(200).json(deletedOption);
    } catch (error) {
      next(error);
    }
  }
);

// Delete age options
optionController.delete(
  endpoints.delete_age_options,
  isUserLogged,
  preloader(getUserById, preloadOptions.getUserById),
  isUserRole(userRole.admin),
  async (req, res, next) => {
    try {
      const optionId = req.params.optionId;

      const deletedOption = await deleteAgeOptions(optionId);

      res.status(200).json(deletedOption);
    } catch (error) {
      next(error);
    }
  }
);

// Delete subscription options
optionController.delete(
  endpoints.delete_subscription_options,
  isUserLogged,
  preloader(getUserById, preloadOptions.getUserById),
  isUserRole(userRole.admin),
  async (req, res, next) => {
    try {
      const optionId = req.params.optionId;

      const deletedOption = await deleteSubscriptionOptions(optionId);

      res.status(200).json(deletedOption);
    } catch (error) {
      next(error);
    }
  }
);

export { optionController };
