import { ThemeProvider } from '@koodoo/koomeleon.ui.theme-provider';
import React, { useState } from 'react';
import { RadioGroup } from './radio-group';

export const BasicRadioGroup = () => {
  const [selectedValue, setSelectedValue] = useState('None');

  const radioButtons = [
    {
      primaryText: 'First Option',
      error: false,
      value: '1',
    },
    {
      primaryText: 'Second Option',
      secondaryText: 'Extra text providing additional context',
      error: false,
      value: '2',
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
    },
  ];
  const props = {
    fieldSet: 'BasicRadioGroup',
    radioButtons: radioButtons,
    errorMessage: '',
    value: selectedValue,
    onValueChange: (value) => {
      setSelectedValue(value);
    },
  };
  return (
    <>
      <ThemeProvider theme="koodooTheme">
        <RadioGroup {...props} />
      </ThemeProvider>
      <div>Selected: {selectedValue}</div>
    </>
  );
};

export const BasicRadioGroupWithErrors = () => {
  const [selectedValue, setSelectedValue] = useState('None');

  const radioButtons = [
    {
      primaryText: 'First Option',
      error: true,
      value: '1',
    },
    {
      primaryText: 'Second Option',
      secondaryText: 'Extra text providing additional context',
      error: true,
      value: '2',
    },
    {
      primaryText: 'Third Option',
      secondaryText: 'Extra text providing additional context',
      suffix: {
        valueText: 'Value',
        valueLabelText: 'Label',
      },
      error: true,
      value: '3',
    },
  ];
  const props = {
    fieldSet: 'BasicRadioGroupWithErrors',
    radioButtons: radioButtons,
    errorMessage: 'Error message goes here',
    value: selectedValue,
    onValueChange: (value) => {
      setSelectedValue(value);
    },
  };
  return (
    <>
      <ThemeProvider theme="koodooTheme">
        <RadioGroup {...props} />
      </ThemeProvider>
      <div>Selected: {selectedValue}</div>
    </>
  );
};

export const BasicRadioGroupWithPreselectedValue = () => {
  const [selectedValue, setSelectedValue] = useState('2');

  const radioButtons = [
    {
      primaryText: 'First Option',
      error: false,
      value: '1',
    },
    {
      primaryText: 'Second Option',
      secondaryText: 'Extra text providing additional context',
      error: false,
      value: '2',
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
    },
  ];
  const props = {
    fieldSet: 'BasicRadioGroupWithPreselectedValue',
    radioButtons: radioButtons,
    errorMessage: '',
    value: selectedValue,
    onValueChange: (value) => {
      setSelectedValue(value);
    },
  };
  return (
    <>
      <ThemeProvider theme="koodooTheme">
        <RadioGroup {...props} />
      </ThemeProvider>
      <div>Selected: {selectedValue}</div>
    </>
  );
};
