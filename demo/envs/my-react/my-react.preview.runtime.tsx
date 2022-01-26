import React, { useState } from 'react';
import { PreviewRuntime } from '@teambit/preview';
import { ReactAspect, ReactPreview } from '@teambit/react';
import { MyReactAspect } from './my-react.aspect';
import { Provider } from '@tommoore96/provider-example.ui.provider';


const ThemeContext = ({ children }) => {
  const [theme, setTheme] = useState('light')

  //This is so the theme selector only appears on the ui component documentation pages.
  if (!window.location.href.includes('/ui/')) return children;
  return (
    <>
      <div>
        <select value={theme} onChange={(event) => setTheme(event.target.value)}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <Provider theme={theme}>{children}</Provider>
    </>
  )
};

export class MyReactPreviewMain {
  static runtime = PreviewRuntime;

  static dependencies = [ReactAspect];

  static async provider([react]: [ReactPreview]) {
    const myReactPreviewMain = new MyReactPreviewMain();
    // register a new provider to wrap all compositions using this environment with a custom theme.
    react.registerProvider([ThemeContext]);

    return myReactPreviewMain;
  }
}

MyReactAspect.addRuntime(MyReactPreviewMain);
