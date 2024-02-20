import { createContext, useContext, useEffect, useState } from "react";

import { EN } from "../languages/languageEn.js";
import { BG } from "../languages/languageBg.js";

const LanguageContext = createContext();

function LanguageProvider({ children }) {
  // Load initial language from local storage, default to EN if not set
  const [toggle, setToggle] = useState(() => {
    const storedToggle = localStorage.getItem("language");
    return storedToggle ? JSON.parse(storedToggle) : true;
  });

  const [lang, setLang] = useState(toggle ? EN : BG);
  const [index, setIndex] = useState(toggle ? 1 : 0);

  useEffect(() => {
    // Update local storage whenever toggle is changed
    localStorage.setItem("language", JSON.stringify(toggle));

    if (toggle) {
      setLang(EN);
      setIndex(1);
    } else {
      setLang(BG);
      setIndex(0);
    }
  }, [toggle]);

  function langChanger() {
    setToggle((s) => !s);
  }

  return (
    <LanguageContext.Provider value={{ lang, langChanger, toggle, index }}>
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
