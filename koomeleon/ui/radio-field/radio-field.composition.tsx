import { ThemeProvider } from '@koodoo/koomeleon.ui.theme-provider';
import React, { useState } from 'react';
import { RadioField } from './radio-field';

export const BasicRadioField = () => {
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
    fieldSet: 'BasicRadioField',
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
        <RadioField {...props} />
      </ThemeProvider>
      <div>Selected: {selectedValue}</div>
    </>
  );
};

export const BasicRadioFieldWithErrors = () => {
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
    fieldSet: 'BasicRadioFieldWithErrors',
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
        <RadioField {...props} />
      </ThemeProvider>
      <div>Selected: {selectedValue}</div>
    </>
  );
};

export const BasicRadioFieldWithPreselectedValue = () => {
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
    fieldSet: 'BasicRadioFieldWithPreselectedValue',
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
        <RadioField {...props} />
      </ThemeProvider>
      <div>Selected: {selectedValue}</div>
    </>
  );
};
