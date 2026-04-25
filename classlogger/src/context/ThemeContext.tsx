


// import { createContext, useContext, useState, useEffect } from 'react';
// import type { ReactNode } from "react";

// interface ThemeContextType {
//   isDark: boolean;
//   toggleTheme: () => void;
// }

// const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// export const ThemeProvider = ({ children }: { children: ReactNode }) => {

//   // ✅ Initialize from localStorage OR system preference
//   const [isDark, setIsDark] = useState(() => {
//     const saved = localStorage.getItem('theme');

//     if (saved) {
//       return saved === 'dark';
//     }

//     // 🔥 fallback: system preference
//     return window.matchMedia('(prefers-color-scheme: dark)').matches;
//   });

//   // ✅ Apply theme to document
//   useEffect(() => {
//     const root = document.documentElement;

//     if (isDark) {
//       root.classList.remove('light-theme');
//     } else {
//       root.classList.add('light-theme');
//     }

//     localStorage.setItem('theme', isDark ? 'dark' : 'light');
//   }, [isDark]);

//   // ✅ Toggle function
//   const toggleTheme = () => {
//     setIsDark(prev => !prev);
//   };

//   return (
//     <ThemeContext.Provider value={{ isDark, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// // ✅ Custom hook
// export const useTheme = () => {
//   const context = useContext(ThemeContext);

//   if (!context) {
//     throw new Error('useTheme must be used within ThemeProvider');
//   }

//   return context;
// };





import { createContext, useContext, useEffect } from 'react';
import type { ReactNode } from "react";

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {

  // Always light mode
  const isDark = false;

  // Apply only light theme
  useEffect(() => {
    const root = document.documentElement;

    root.classList.add('light-theme');
    root.classList.remove('dark-theme');

    localStorage.setItem('theme', 'light');
  }, []);

  // Disable toggle
  const toggleTheme = () => {
    return;
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
};
