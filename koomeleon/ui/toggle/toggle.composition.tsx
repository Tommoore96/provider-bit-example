import React, { useState } from 'react';
import { Toggle } from './toggle';

export const ToggleComponent = () => {
  const [checked, setChecked] = useState(true);
  return <Toggle checked={checked} onChange={() => setChecked(!checked)} />;
};
