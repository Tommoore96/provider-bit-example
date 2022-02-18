import React, { useState } from 'react';
import { ThemeProvider } from '@koodoo/koomeleon.ui.theme-provider';
import { PreviewRuntime } from '@teambit/preview';
import { ReactAspect, ReactPreview } from '@teambit/react';
import { MyReactAspect } from './react-env.aspect';

export const ThemeContext = ({ children }) => {
  const [theme, setTheme] = useState('koodooTheme');

  //This is so the theme selector only appears on the ui component documentation pages.
  if (!window.location.href.includes('/ui/')) return children;
  return (
    <>
      <select
        value={theme}
        onChange={(event) => setTheme(event.target.value)}
        style={{
          borderRadius: '5px',
          bottom: '40px',
          padding: '15px',
          position: 'fixed',
          right: '40px',
          zIndex: 2,
        }}
      >
        <option value="koodooTheme">Koodoo</option>
        <option value="confusedTheme">Confused</option>
        <option value="nerdWalletTheme">Nerd Wallet</option>
      </select>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  );
};

export class MyReactPreviewMain {
  static runtime = PreviewRuntime;

  static dependencies = [ReactAspect];

  static async provider([react]: [ReactPreview]) {
    const myReactPreviewMain = new MyReactPreviewMain();
    react.registerProvider([ThemeContext]);

    return myReactPreviewMain;
  }
}

MyReactAspect.addRuntime(MyReactPreviewMain);
