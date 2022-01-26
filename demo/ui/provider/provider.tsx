import React from 'react';
import { ThemeProvider as StyledComponentsProvider } from 'styled-components';

type ProviderProps = {
  children?: React.ReactChild;
  theme: string;
};

const themes = {
  dark: { backgroundColour: 'black', textColour: 'white' },
  light: { backgroundColour: 'white', textColour: 'black' }
}

const Provider: React.FC<ProviderProps> = ({ children, theme = 'light' }) => {
  console.log("🚀 ~ file: provider.tsx ~ line 17 ~ themes[theme]", themes[theme])
  return (
    <StyledComponentsProvider theme={themes[theme]}>
      {children}
    </StyledComponentsProvider>
  )
};

export { Provider, ProviderProps };