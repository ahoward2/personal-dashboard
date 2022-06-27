import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useRef,
} from "react";

// @ts-ignore
export const ThemeContext = createContext();

const getInitialTheme = () => {
  let currentTheme;
  if (window !== undefined) {
    currentTheme = window.localStorage.getItem("theme");
  }
  return currentTheme || "light";
};

export const ThemeContextProvider = (props) => {
  const initialTheme = getInitialTheme();
  const [theme, setTheme] = useState<string>(initialTheme);
  const isMounted = useRef(false);
  const root = window.document.documentElement;

  const handleThemeSwitch = (theme) => {
    console.log("tried to switch theme: ", theme);
    const currentTheme = window.localStorage.getItem("theme");
    if (!currentTheme) {
      window.localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      setTheme(theme);
      window.localStorage.setItem("theme", theme);
    }
  };

  useEffect(() => {
    // if (isMounted.current) {
    root.classList.remove("light");
    root.classList.remove("dark");
    root.classList.add(theme);
    // } else {
    //   isMounted.current = true;
    // }
  }, [theme]);

  const value = {
    theme,
    switchTheme: () => handleThemeSwitch(theme === "light" ? "dark" : "light"),
  };
  return <ThemeContext.Provider value={value} {...props} />;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(`useTheme must be used within a UserThemeProvider.`);
  }
  return context;
};
