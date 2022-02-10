import React from 'react';
import { render, screen } from '@testing-library/react';
import { ErrorMessage } from './error-message';

const mockUseTheme = {
  assets: {
    icons: {
      error: () => <div data-testid="error-icon">Mocked Icon</div>,
    },
  },
};

jest.mock('styled-components', () => {
  const originalModule = jest.requireActual('styled-components');
  return {
    __esModule: true,
    ...originalModule,
    useTheme: () => mockUseTheme,
  };
});

it('should render with the correct text with an svg', () => {
  render(<ErrorMessage>hello from ErrorMessage</ErrorMessage>);

  expect(screen.getByText('hello from ErrorMessage')).toBeTruthy();
  expect(screen.getByTestId('error-icon')).toBeTruthy();
});
