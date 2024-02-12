import { createContext, useContext, useEffect, useState } from "react";

import { EN } from "../languages/languageEn.js";
import { BG } from "../languages/languageBg.js";

const LanguageContext = createContext();

function LanguageProvider({ children }) {
  const [toggle, setToggle] = useState(true);
  const [lang, setLang] = useState(EN);

  useEffect(
    function () {
      if (toggle) {
        setLang(EN);
      } else {
        setLang(BG);
      }
    },
    [toggle]
  );

  function langChanger() {
    setToggle((s) => !s);
  }

  return (
    <LanguageContext.Provider value={{ lang, langChanger, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

function useLanguage() {
  const context = useContext(LanguageContext);

  if (context === undefined)
    throw new Error("LanguageContext is used outside the context provider");

  return context;
}

export { LanguageProvider, useLanguage };
