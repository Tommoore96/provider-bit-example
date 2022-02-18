import React from 'react';
import { render, screen } from '@testing-library/react';
import { RadioButton } from './radio-button';

let DEFAULT_PROPS = {
  primaryText: 'Test Option',
  secondaryText: 'Extra text providing additional context',
  suffix: {
    valueText: 'Value',
    valueLabelText: 'Label',
  },
  error: false,
  value: 'value',
  onValueChange: jest.fn(),
};

test('renders a radio button', () => {
  render(<RadioButton {...DEFAULT_PROPS} />);
  expect(screen.getByRole('radio')).toBeVisible();
});

test('renders radio button props', () => {
  render(<RadioButton {...DEFAULT_PROPS} />);
  expect(screen.getByText('Test Option')).toBeVisible();
  expect(
    screen.getByText('Extra text providing additional context')
  ).toBeVisible();
  expect(screen.getByText('Value')).toBeVisible();
  expect(screen.getByText('Label')).toBeVisible();
});
