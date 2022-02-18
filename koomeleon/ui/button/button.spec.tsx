import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from './button';
import { ClockIcon } from './clock-icon';
import { ThemeProvider } from '@koodoo/koomeleon.ui.theme-provider';

test('renders an html button', () => {
  render(
    <ThemeProvider theme={'koodooTheme'}>
      <Button buttonType="primary" buttonSize="medium" />
    </ThemeProvider>
  );

  expect(screen.getByRole('button')).toBeVisible();
});

test('renders any children passed to component', () => {
  render(
    <ThemeProvider theme={'koodooTheme'}>
      <Button buttonType="primary" buttonSize="medium">
        <ClockIcon />
        Click me
      </Button>
    </ThemeProvider>
  );

  expect(screen.getByText('Click me')).toBeVisible();
  expect(screen.getByTestId('clock-icon')).toBeVisible();
});
