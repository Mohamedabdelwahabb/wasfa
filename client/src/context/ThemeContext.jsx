import React, { useState, createContext } from "react";
export const ThemeContext = React.createContext({ theme: "light", undefined });
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
