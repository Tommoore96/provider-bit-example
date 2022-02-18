import React from 'react';
import { render, screen } from '@testing-library/react';
import { RadioGroup } from './radio-group';

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

const radioButtons = [
  {
    primaryText: 'First Option',
    error: false,
    value: '1',
    onValueChange: () => null,
  },
  {
    primaryText: 'Second Option',
    secondaryText: 'Extra text providing additional context',
    error: false,
    value: '2',
    onValueChange: () => null,
  },
  {
    primaryText: 'Third Option',
    secondaryText: 'Extra text providing additional context',
    suffix: {
      valueText: 'Value',
      valueLabelText: 'Label',
    },
    error: false,
    value: '3',
    onValueChange: () => null,
  },
];
const DEFAULT_PROPS = {
  fieldSet: 'BasicRadioGroupWithErrors',
  radioButtons: radioButtons,
  errorMessage: 'Error message goes here',
  value: '',
  onValueChange: (value) => {
    console.log(value);
  },
};

test('renders a group', () => {
  render(<RadioGroup {...DEFAULT_PROPS} />);

  expect(screen.getByRole('group')).toBeVisible();
});

test('renders any radio buttons passed to component', () => {
  const radioButton = {
    primaryText: 'Test Option',
    secondaryText: 'Extra text providing additional context',
    suffix: {
      valueText: 'Value',
      valueLabelText: 'Label',
    },
    error: false,
    value: '1',
    onValueChange: () => null,
  };
  const DEFAULT_PROPS_WITH_RADIO = {
    radioButtons: [radioButton],
    ...DEFAULT_PROPS,
  };
  DEFAULT_PROPS.radioButtons.push(radioButton);
  render(<RadioGroup {...DEFAULT_PROPS_WITH_RADIO} />);

  expect(screen.getByText('Test Option')).toBeVisible();
});
