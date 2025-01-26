import { createContext, useEffect, useState } from "react";

interface ThemeContextType {
  theme: boolean;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextType>(null);

const ThemeProvider = ({ children }) => {
  useEffect(() => {
    const mode = localStorage.getItem("theme");
    if (mode === "dark") {
      setTheme(true);
      document.body.classList.toggle("dark");
    }
  }, []);

  const [theme, setTheme] = useState(false);

  const toggle = () => {
    const newTheme = !theme ? "dark" : "light";

    localStorage.setItem("theme", newTheme);

    setTheme((prev) => !prev);

    document.body.classList.toggle("dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
