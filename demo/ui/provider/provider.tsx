import React from 'react';
import { ThemeProvider as StyledComponentsProvider } from 'styled-components';
import { themes } from '@tommoore96/provider-example.themes';

type ProviderProps = {
  children?: React.ReactChild;
  theme: string;
};


const Provider: React.FC<ProviderProps> = ({ children, theme = 'light' }) => {
  return (
    <StyledComponentsProvider theme={themes[theme]}>
      {children}
    </StyledComponentsProvider>
  )
};

export { Provider, ProviderProps };