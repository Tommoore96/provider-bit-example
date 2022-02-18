import React, { useState } from 'react';
import { Input } from './input';
import { ThemeProvider } from '@koodoo/koomeleon.ui.theme-provider';

export const BasicInput = () => {
  const [value, setValue] = useState('');

  return (
    <Input
      onChange={(e) => setValue(e.target.value)}
      value={value}
      placeholder="Text goes here"
    />
  );
};

export const InputWithPrefix = () => {
  const [value, setValue] = useState('');

  return (
    <Input
      prefix="£"
      onChange={(e) => setValue(e.target.value)}
      value={value}
      placeholder="Text goes here"
    />
  );
};

export const InputWithSuffix = () => {
  const [value, setValue] = useState('');

  return (
    <Input
      suffix="years"
      onChange={(e) => setValue(e.target.value)}
      value={value}
      placeholder="Text goes here"
    />
  );
};

export const InputWithErrorMessage = () => {
  const [value, setValue] = useState('');

  return (
    <Input
      suffix="years"
      errorMessage="Invalid Year"
      onChange={(e) => setValue(e.target.value)}
      value={value}
      placeholder="Text goes here"
    />
  );
};
