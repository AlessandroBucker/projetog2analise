import React, { createContext, useState, useEffect, useContext } from 'react';

type Theme = {
  primaryColor: string;
  isDarkMode: boolean; // <-- Nova propriedade
};

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleDarkMode: () => void; // <-- Nova função
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Puxa do localStorage ou inicia com Claro + Azul
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('saas_theme');
    return saved ? JSON.parse(saved) : { primaryColor: '#2563eb', isDarkMode: false };
  });

  useEffect(() => {
    // 1. Salva no navegador
    localStorage.setItem('saas_theme', JSON.stringify(theme));

    // 2. Aplica a cor primária
    document.documentElement.style.setProperty('--primary-color', theme.primaryColor);

    // 3. LIGA ou DESLIGA o modo escuro na tag principal do site
    if (theme.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleDarkMode = () => {
    setTheme(prev => ({ ...prev, isDarkMode: !prev.isDarkMode }));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
};