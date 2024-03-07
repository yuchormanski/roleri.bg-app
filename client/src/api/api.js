import { BASE_URL, USER_LOCAL_STORAGE_KEY } from "../services/environment.js";

async function request(method, url, data) {
  const options = {
    method,
    headers: {},
  };
  if (data !== undefined) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  const userData = JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE_KEY));
  if (userData) {
    options.headers["X-Authorization"] = userData.accessToken;
  }
  const response = await fetch(BASE_URL + url, options);

  if (response.ok == false) {
    const error = await response.json();

    throw error;
  }

  const result = await response.json();

  return result;
}

export const get = request.bind(null, "get");
export const post = request.bind(null, "post");
export const put = request.bind(null, "put");
export const del = request.bind(null, "delete");
