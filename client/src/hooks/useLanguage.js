import { EN } from "../util/languageEn.js";
import { BG } from "../util/languageBg.js";
import { languageSet } from "../util/lang.js";

export function useLanguage() {
  const language = languageSet;
  return { language };
}
