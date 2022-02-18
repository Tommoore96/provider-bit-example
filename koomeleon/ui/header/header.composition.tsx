import React, { useState } from 'react';
import styled from 'styled-components';
import { Header } from './header';
import { GenericCustomerLogo } from './GenericCustomerLogo';
import { PoweredByKoodooLogo } from './PoweredByKoodooLogo';
import { ProgressBar } from '@koodoo/koomeleon.ui.progress-bar';

export const BasicHeaderWithProgressBar = () => {
  const [percent, setPercent] = useState(50);
  return (
    <div onClick={() => (percent >= 100 ? setPercent(0) : setPercent(100))}>
      <Header>
        <GenericCustomerLogo />
        <PoweredByKoodooLogo />
        <ProgressBar percent={percent} showPercent={false} />
      </Header>
    </div>
  );
};

export const BasicHeaderWithPercentProgressBar = () => {
  const [percent, setPercent] = useState(50);
  return (
    <div
      onClick={() => (percent >= 100 ? setPercent(0) : setPercent(100))}
    >
      <Header>
        <GenericCustomerLogo />
        <PoweredByKoodooLogo />
        <ProgressBar percent={percent} showPercent={true} />
      </Header>
    </div>
  );
};
