import { ErrorMessage } from '@koodoo/koomeleon.ui.error-message';
import {
  ComponentComposition,
  ComponentName,
  GetFontCSSForDefaultComposition
} from '@koodoo/koomeleon.utils.font';
import React from 'react';
import styled, { css } from 'styled-components';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  /**
   * If there is an error pass a string with the error message, 
   * if there is no string or the string is empty then the error will be hidden.
   */
  errorMessage?: string | null;
  /**
   * Add a prefix to the value input such as "£".
   */
  prefix?: string;
  /**
   * Add a suffix to the value input such as "years".
   */
  suffix?: string;
};

type InputContainerProps = {
  children: React.ReactNode;
  prefix?: string;
  suffix?: string;
  valid: boolean;
};

type PrefixProps = {
  children: React.ReactNode;
};

type SuffixProps = {
  children: React.ReactNode;
};

const InputContainer = styled.div<InputContainerProps>`
  align-items: stretch;
  border-radius: ${({ theme }) => theme?.content?.borderRadius?.inputField}px;
  box-shadow: ${({ theme, valid }) => {
    return valid ?
      theme?.colors?.boxShadow?.inputField?.default : theme?.colors?.boxShadow?.inputField?.error
  }};
  display: flex;
  padding: 16px;
  position: relative;
  width: 100%;

  ${({ theme }) => css`
    &:focus-within {
      box-shadow: ${theme?.colors?.boxShadow?.inputField?.focusWithin};
      }
      
    &:active {
      box-shadow: ${theme?.colors?.boxShadow?.inputField?.active};
    }`
  }
      

`;

const StyledInput = styled.input<React.InputHTMLAttributes<HTMLInputElement>>`
  align-items: stretch;
  appearance: none;
  background: transparent;
  border: none;
  display: flex;
  outline: none;
  padding: 0 8px;
  width: 100%;
  ::placeholder {
    ${({ theme }) =>
    GetFontCSSForDefaultComposition(
      theme,
      ComponentName.INPUT_FIELD,
      ComponentComposition.PLACEHOLDER_TEXT
    )}
  }
  ${({ theme }) =>
    GetFontCSSForDefaultComposition(
      theme,
      ComponentName.INPUT_FIELD,
      ComponentComposition.INPUT_TEXT
    )}
`;

const Prefix = styled.span<PrefixProps>`
  color: black;
  display: flex;
  flex-grow: 1;
  ${({ theme }) =>
    GetFontCSSForDefaultComposition(
      theme,
      ComponentName.INPUT_FIELD,
      ComponentComposition.PRIMARY_TEXT
    )}
`;

const Suffix = styled.span<SuffixProps>`
  color: black;
  display: flex;
  flex-grow: 1;
  right: 1rem;
  ${({ theme }) =>
    GetFontCSSForDefaultComposition(
      theme,
      ComponentName.INPUT_FIELD,
      ComponentComposition.PRIMARY_TEXT
    )}
`;

export const Input = ({
  errorMessage,
  prefix,
  suffix,
  ...props
}: InputProps) => (
  <>
    <InputContainer prefix={prefix} suffix={suffix} valid={!errorMessage}>
      {prefix && <Prefix>{prefix}</Prefix>}
      <StyledInput {...props} />
      {suffix && <Suffix>{suffix}</Suffix>}
    </InputContainer>
    {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
  </>
);
