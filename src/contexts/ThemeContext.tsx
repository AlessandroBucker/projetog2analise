import React, { createContext, useState, useEffect, useContext } from 'react';

type Theme = {
  primaryColor: string;
};

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>({ primaryColor: '#2563eb' });

  useEffect(() => {
    // Atualiza a variável CSS global sempre que o tema mudar
    document.documentElement.style.setProperty('--primary-color', theme.primaryColor);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook customizado para facilitar o uso nos componentes
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
};