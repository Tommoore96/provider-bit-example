import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProgressBar } from './progress-bar';

const DEFAULT_PROPS = {
  percent: 50,
  showPercent: false
};

test('renders a progress bar', () => {
  render(<ProgressBar {...DEFAULT_PROPS} />);
  expect(screen.getByTestId('progress-bar-container')).toBeVisible();
  expect(screen.getByTestId('progress-bar')).toBeVisible();
});

test('renders a progress bar with percent values', () => {
  const DEFAULT_PROPS_SHOW_PERCENT_ENABLED = {
    ...DEFAULT_PROPS,
    showPercent: true
  }
  render(<ProgressBar {...DEFAULT_PROPS_SHOW_PERCENT_ENABLED} />);
  expect(screen.getByTestId('progress-bar-container')).toBeVisible();
  expect(screen.getByTestId('progress-bar')).toBeVisible();
  expect(screen.getByTestId('progress-bar-percent')).toBeVisible();
});