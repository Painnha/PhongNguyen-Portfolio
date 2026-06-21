import { createContext, useContext, useEffect } from 'react';

const ThemeContext = createContext();

// ── THEME CONFIGURATION ──
// Change this value to switch themes statically: 'modern' or 'classic'
export const ACTIVE_THEME = 'modern';

export function ThemeProvider({ children }) {
  // Sync hardcoded theme to the HTML root element on mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', ACTIVE_THEME);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme: ACTIVE_THEME,
        setTheme: () => { },
        toggleTheme: () => { }
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

