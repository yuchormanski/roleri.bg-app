import { environment } from "../environments/environment.js";
import { clearUserData, getUserData } from "./util.js";

const host = environment.BASE_URL;

async function request(method, url, data) {
  const options = {
    method,
    headers: {},
  };

  const userData = getUserData();
  if (userData) {
    const token = userData.accessToken;
    options.headers["X-Authorization"] = token;
  }

  if (data !== undefined) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(host + url, options);

    let result;
    if (response.status != 204) {
      result = await response.json();
    }
    if (response.ok == false) {
      if (response.status == 403) {
        clearUserData();
      }
      const error = { result, statusCode: response.status };
      throw error;
    }

    return result;
  } catch (error) {
    // alert(error.message);
    clearUserData();

    // throw new Error(error.message);
    console.log(error);
    return { isError: error };
  }
}

export const get = request.bind(null, "get");
export const post = request.bind(null, "post");
export const put = request.bind(null, "put");
export const del = request.bind(null, "delete");