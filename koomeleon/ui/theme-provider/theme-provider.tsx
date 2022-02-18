import React from 'react';
import { ThemeProvider as StyledComponentsProvider } from 'styled-components';
import { themes } from '@koodoo/koomeleon.themes';
import { GlobalStyle } from './global-style';

type ThemeProviderProps = {
  children?: React.ReactChild;
  theme: string;
};

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, theme = 'koodooTheme' }) => (
  <StyledComponentsProvider theme={themes[theme]}>
    <GlobalStyle />
    {children}
  </StyledComponentsProvider>
);

export { ThemeProvider, ThemeProviderProps };
