import { BASE_URL } from "./environment.js";

async function getLanguage() {
  const res = await fetch(BASE_URL);
  console.log(res.code);
  const data = await res.json();

  return data;
}

export { getLanguage };
