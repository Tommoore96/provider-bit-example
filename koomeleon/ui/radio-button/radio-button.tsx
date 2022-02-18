import React from 'react';
import styled from 'styled-components';
import {
  ComponentComposition,
  ComponentName,
  GetFontCSSForCustomComposition,
} from '@koodoo/koomeleon.utils.font';

export type RadioButtonProps = {
  /**
   * Primary text for the radio button.
   */
  primaryText: string;
  /**
   * Secondary text for the radio button, displayed under the primary text.
   */
  secondaryText?: string;
  /**
   * Additional text to the right of the radio button, contains two additional text items to display.
   */
  suffix?: SuffixProps;
  /**
   * Flag to toggle display of error styles.
   */
  error?: boolean;
  /**
   * Parameter to group radio buttons together within a field set.
   */
  name?: string;
  /**
   * Flag to toggle display of checked styles.
   */
  checked?: boolean;
  /**
   * Function to handle value changes.
   */
  onValueChange?: Function;
  /**
   * Parameter to determine the value of the input component.
   */
  value: (string | number | readonly string[]) & (string | number | boolean);
};
interface SuffixProps {
  valueText: string;
  valueLabelText: string;
}

const ContentContainer = styled.div`
  display: grid;
  margin: 0 16px 0 12px;
  row-gap: 4px;
  width: 100%;
`;

const SecondaryText = styled.div`
  ${({ theme }) =>
    GetFontCSSForCustomComposition(
      theme,
      ComponentName.RADIO_BUTTON,
      ComponentComposition.SECONDARY_TEXT
    )}
`;

const Input = styled.input<RadioButtonProps>`
  outline: 0;
  /* Add if not using autoprefixer */
  -webkit-appearance: none;
  /* Remove most all native input styles */
  appearance: none;
  /* Not removed via appearance */
  margin: 0;
  font: inherit;
  /* outer circle outline */

  border: ${({ error, theme }) => {
    if (theme) {
      return error
        ? `1px solid ${theme?.colors?.border?.radioButton?.primary?.error};`
        : `1px solid ${theme?.colors?.border?.radioButton?.primary?.default};`;
    }
  }};
  /* background color for circular select */
  background-color: #f4f6f9;
  /* center circle color */
  color: ${({ error, theme }) => {
    if (theme) {
      return error
        ? `${theme?.colors?.border?.radioButton?.primary?.error};`
        : `${theme?.colors?.border?.radioButton?.primary?.active};`;
    }
  }};
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  transform: translateY(-0.075em);
  display: grid;
  place-content: center;
  ::before {
    content: '';
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 9999px;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: ${({ error, theme }) => {
    if (theme) {
      return error
        ? `inset 1rem 1rem ${theme?.colors?.text?.radioButton?.error};`
        : `inset 1rem 1rem ${theme?.colors?.text?.radioButton?.default};`;
    }
  }};
    /* Windows High Contrast Mode */
    background-color: CanvasText;
  }
  &:checked {
    /* checked outer circle color */
    border: ${({ error, theme }) => {
    if (theme) {
      return error
        ? `2px solid ${theme?.colors?.border?.radioButton?.primary?.error};`
        : `2px solid ${theme?.colors?.border?.radioButton?.primary?.active};`;
    }
  }};
  }
  &:checked::before {
    transform: scale(1);
  }
`;

const InputContainer = styled.div`
  display: inline-block;
`;

const Label = styled.label<RadioButtonProps>`
  display: flex;
  box-sizing: border-box;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: fit-content;
  background: #ffffff;
  border-radius: ${({ theme }) => theme?.content?.borderRadius?.radioButton}px;
  cursor: pointer;

  ${({ error, theme }) =>
    error
      ? `
  box-shadow: ${theme?.colors?.boxShadow?.radioButton?.primary?.error};
    `
      : `
  box-shadow: ${theme?.colors?.boxShadow?.radioButton?.primary?.default};
  &:hover {
    box-shadow: ${theme?.colors?.boxShadow?.radioButton?.primary?.hover};
    background: ${theme?.colors?.background?.radioButton?.primary?.hover}};
  }
  &:focus-within {
    box-shadow: ${theme?.colors?.boxShadow?.radioButton?.primary?.focusWithin};
    background: ${theme?.colors?.background?.radioButton?.primary?.focusWithin}};
  }
  &:focus-visible {
    box-shadow: ${theme?.colors?.boxShadow?.radioButton?.primary?.focusVisible};
    background: ${theme?.colors?.background?.radioButton?.primary?.focusVisible}};
  }
  &:active {
    box-shadow: ${theme?.colors?.boxShadow?.radioButton?.primary?.active};
    background: ${theme?.colors?.background?.radioButton?.primary?.active}};
  }
    `}

  padding: 1rem;
`;

const SuffixContainer = styled.div<RadioButtonProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-end;
`;

const SuffixValueLabelText = styled.div`
  display: block;
  text-align: center;
  letter-spacing: 0.02em;
  ${({ theme }) =>
    GetFontCSSForCustomComposition(
      theme,
      ComponentName.RADIO_BUTTON,
      ComponentComposition.VALUE_LABEL_TEXT
    )}
`;

const SuffixValueText = styled.div`
  display: block;
  text-align: center;
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 0px;
  ${({ theme }) =>
    GetFontCSSForCustomComposition(
      theme,
      ComponentName.RADIO_BUTTON,
      ComponentComposition.VALUE_TEXT
    )}
`;
const PrimaryText = styled.div`
  ${({ theme }) =>
    GetFontCSSForCustomComposition(
      theme,
      ComponentName.RADIO_BUTTON,
      ComponentComposition.PRIMARY_TEXT
    )}
`;

export function RadioButton(props: RadioButtonProps) {
  const { primaryText, secondaryText, suffix, onValueChange } = props;
  return (
    <Label data-testid="radio-button-label" {...props}>
      <InputContainer>
        <Input
          {...props}
          onChange={(event) => onValueChange(event.target.value)}
          data-testid="radio-button-input"
          type="radio"
        />
      </InputContainer>
      <ContentContainer>
        <PrimaryText data-testid="radio-button-title">
          {primaryText}
        </PrimaryText>
        {secondaryText && (
          <SecondaryText data-testid="radio-button-description">
            {secondaryText}
          </SecondaryText>
        )}
      </ContentContainer>
      {suffix && (
        <SuffixContainer {...props}>
          <SuffixValueText data-testid="radio-button-suffix-value">
            {suffix.valueText}
          </SuffixValueText>
          <SuffixValueLabelText data-testid="radio-button-suffix-label">
            {suffix.valueLabelText}
          </SuffixValueLabelText>
        </SuffixContainer>
      )}
    </Label>
  );
}
