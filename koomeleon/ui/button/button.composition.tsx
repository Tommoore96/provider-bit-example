import { ThemeProvider } from '@koodoo/koomeleon.ui.theme-provider';
import React from 'react';
import { Button, ButtonSize, ButtonType } from './button';
import { ClockIcon } from './clock-icon';

export const DefaultButtons = ({ children = 'Click me' }) => (
  // <ThemeProvider theme="koodooTheme">
  <div>
    Small
    <div style={{ margin: '2px' }}>
      <Button buttonType="primary" buttonSize="small">
        {children}
      </Button>
    </div>
    <div style={{ margin: '2px' }}>
      <Button buttonType="secondary" buttonSize="small">
        {children}
      </Button>
    </div>
    <div style={{ margin: '2px' }}>
      <Button buttonType="critical" buttonSize="small">
        {children}
      </Button>
    </div>
    Medium
    <div style={{ margin: '2px' }}>
      <Button buttonType="primary" buttonSize="medium">
        {children}
      </Button>
    </div>
    <div style={{ margin: '2px' }}>
      <Button buttonType="secondary" buttonSize="medium">
        {children}
      </Button>
    </div>
    <div style={{ margin: '2px' }}>
      <Button buttonType="critical" buttonSize="medium">
        {children}
      </Button>
    </div>
  </div>
  // </ThemeProvider>
);

export const DefaultButtonsWithIcon = ({ children = 'Click me' }) => (

  <div>
    Small
    <div style={{ margin: '2px' }}>
      <Button buttonType="primary" buttonSize="small">
        <ClockIcon />
        {children}
      </Button>
    </div>
    <div style={{ margin: '2px' }}>
      <Button buttonType="secondary" buttonSize="small">
        <ClockIcon />
        {children}
      </Button>
    </div>
    <div style={{ margin: '2px' }}>
      <Button buttonType="critical" buttonSize="small">
        <ClockIcon />
        {children}
      </Button>
    </div>
    Medium
    <div style={{ margin: '2px' }}>
      <Button buttonType="primary" buttonSize="medium">
        <ClockIcon />
        {children}
      </Button>
    </div>
    <div style={{ margin: '2px' }}>
      <Button buttonType="secondary" buttonSize="medium">
        <ClockIcon />
        {children}
      </Button>
    </div>
    <div style={{ margin: '2px' }}>
      <Button buttonType="critical" buttonSize="medium">
        <ClockIcon />
        {children}
      </Button>
    </div>
  </div>

);
