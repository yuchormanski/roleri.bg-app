import { EN } from "../util/languageEn.js";
import { BG } from "../util/languageBg.js";

function languageSet(local, phrase) {
  //default locals format - bg-BG; en-US

  //const local = window.navigator.language.split('-).at(1);

  const baseLang = local ? BG : EN;

  return baseLang[phrase];
}

export { languageSet };
