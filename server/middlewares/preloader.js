import { preloadOptions } from "../environments/constants.js";

const preloader = (api, option) => async (req, res, next) => {
  try {
    const result = checkOptions(option, req);

    const currentState = await api(...result.params);

    if (currentState) {
      res.locals.preloadData = currentState;
      next();
    } else {
      throw new Error(result.errorMessage);
    }
  } catch (error) {
    next(error);
  }
};

// Here add more options to use preloader
function checkOptions(option, req) {
  const result = {
    params: [],
    errorMessage: "",
  };

  switch (option) {
    case preloadOptions.editSkater:
      result.params = [req.body._id];
      result.errorMessage = "Error on update skater (from preloader)";
      break;
    case preloadOptions.deleteSkater:
      result.params = [req.params.skaterId];
      result.errorMessage = "Error on delete Skater (from preloader)";
      break;
    case preloadOptions.getSkater:
      result.params = [req.params.skaterId];
      result.errorMessage = "Error on getting Skater (from preloader)";
      break;
    case preloadOptions.getUserById:
      result.params = [req.user._id];
      result.errorMessage = "Error on get user by ID (from preloader)";
      break;
    case preloadOptions.checkSkater:
      result.params = [req.body[0]['skaterId']];
      result.errorMessage = "Error on check booking skater by ID (from preloader)";
      break;

    default:
      throw new Error("Invalid preload option");
  }

  return result;
}

export default preloader;
