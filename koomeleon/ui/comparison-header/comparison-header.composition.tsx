import React, { useState } from 'react';
import styled from 'styled-components';
import { ComparisonHeader } from './comparison-header';
import { GenericCustomerLogo } from './GenericCustomerLogo';
import { PoweredByKoodooLogo } from './PoweredByKoodooLogo';
import { ProgressBar } from '@koodoo/koomeleon.ui.progress-bar';

const Wrapper = styled.div`
  background-color: #f4f6f9;
  width: 350px;
  height: 100%;
  padding: 10px;
  cursor: pointer;
`;

export const BasicComparisonHeaderWithProgressBar = () => {
  const [percent, setPercent] = useState(50);
  return (
    <Wrapper onClick={() => (percent >= 100 ? setPercent(0) : setPercent(100))}>
      <ComparisonHeader>
        <GenericCustomerLogo />
        <PoweredByKoodooLogo />
        <ProgressBar percent={percent} showPercent={false} />
      </ComparisonHeader>
    </Wrapper>
  );
};

export const BasicComparisonHeaderWithPercentProgressBar = () => {
  const [percent, setPercent] = useState(50);
  return (
    <Wrapper
      onClick={() => (percent >= 100 ? setPercent(0) : setPercent(100))}
    >
      <ComparisonHeader>
        <GenericCustomerLogo />
        <PoweredByKoodooLogo />
        <ProgressBar percent={percent} showPercent={true} />
      </ComparisonHeader>
    </Wrapper>
  );
};
