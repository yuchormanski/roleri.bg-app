import { EN } from "../util/languageEn.js";
import { BG } from "../util/languageBg.js";

function useLanguage(phrase) {
  //default locals format - bg-BG; en-US

  //const local = window.navigator.language.split('-).at(1);

  //   const baseLang = local === "BG" ? BG : EN;

  const baseLang = EN;
  return baseLang[phrase];
}

export { useLanguage };
