import React from 'react';
import { RadioButton } from './radio-button';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #f4f6f9;
  width: 100%;
  height: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
`;

export const Title = () => (
  <RadioButton
    onValueChange={() => null}
    value="composition"
    primaryText="Label"
    name="compositions"
  />
);
export const TitleAndDescription = () => (
  <RadioButton
    onValueChange={() => null}
    value="composition"
    primaryText="Label"
    secondaryText="Extra text providing additional context"
    name="compositions"
  />
);
export const TitleAndSuffix = () => (
  <RadioButton
    onValueChange={() => null}
    value="composition"
    primaryText="Label"
    suffix={{ valueText: 'Value', valueLabelText: 'label' }}
    name="compositions"
  />
);
export const TitleAndDescriptionAndSuffix = () => (
  <RadioButton
    onValueChange={() => null}
    value="composition"
    primaryText="Label"
    secondaryText="Extra text providing additional context"
    suffix={{ valueText: 'Value', valueLabelText: 'label' }}
    name="compositions"
  />
);
export const TitleAndError = () => (
  <RadioButton
    onValueChange={() => null}
    value="composition"
    primaryText="Label"
    error={true}
    name="compositions"
  />
);
export const TitleAndDescriptionAndError = () => (
  <RadioButton
    onValueChange={() => null}
    value="composition"
    primaryText="Label"
    secondaryText="Extra text providing additional context"
    error={true}
    name="compositions"
  />
);
export const TitleAndDescriptionAndSuffixAndError = () => (
  <RadioButton
    onValueChange={() => null}
    value="composition"
    primaryText="Label"
    secondaryText="Extra text providing additional context"
    suffix={{ valueText: 'Value', valueLabelText: 'label' }}
    error={true}
    name="compositions"
  />
);
