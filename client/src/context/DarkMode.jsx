import { createContext, useContext, useEffect, useState } from "react";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  // Load initial theme from local storage, default to light mode if not set
  const [isDark, setIsDark] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? JSON.parse(storedTheme) : false;
  });

  useEffect(() => {
    // Update local storage whenever theme is changed
    localStorage.setItem("theme", JSON.stringify(isDark));

    if (isDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  function themeToggle() {
    setIsDark((mode) => !mode);
  }

  return (
    <DarkModeContext.Provider value={{ isDark, themeToggle }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(DarkModeContext);

  if (context === undefined)
    throw new Error("DarkMode is used outside the context provider");

  return context;
}

export { DarkModeProvider, useTheme };
