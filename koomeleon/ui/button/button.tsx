import React, { ComponentType } from 'react';
import styled, { css } from 'styled-components';
import {
  GetFontCSSForCustomComposition,
  ComponentName,
  ComponentComposition,
} from '@koodoo/koomeleon.utils.font';

export type ButtonProps = {
  /**
   * Type of button: primary, secondary or critical.
   */
  buttonType: ButtonType;
  /**
   * An SVG image or text render.
   */
  children?: React.ReactNode;
  /**
   * A size preset for the button: small or medium.
   */
  buttonSize: ButtonSize;
};

export type ButtonType = 'primary' | 'secondary' | 'critical';

export type ButtonSize = 'small' | 'medium';

export const Button = styled.button<ButtonProps>`
  align-items: center;
  background-color: ${({ buttonType, theme }) =>
    theme?.colors?.background?.button[buttonType]?.default};
  border: none;
  border-radius: ${({ theme }) => theme?.content?.borderRadius?.button}px;
  color: ${({ buttonType, theme }) =>
    theme?.colors?.text?.button[buttonType]?.default};
  display: inline-flex;
  ${({ buttonSize, theme }) => {
    return GetFontCSSForCustomComposition(
      theme,
      ComponentName.BUTTON,
      buttonSize as ComponentComposition
    );
  }}
  outline: none;
  padding: ${({ buttonSize }) =>
    buttonSize === 'medium' ? css`16px 24px;` : css`12px 16px;`}
  cursor: pointer;
  box-shadow: ${({ buttonType, theme }) =>
    theme?.colors?.boxShadow?.button[buttonType]?.default};
  > svg {
    path {
      fill: ${({ buttonType, theme }) =>
        theme?.colors?.text?.button[buttonType]?.default};
    }
    margin-right: 8px;
  }

  &:hover {
    background-color: ${({ buttonType, theme }) =>
      theme?.colors?.background?.button[buttonType]?.hover};
    box-shadow: ${({ buttonType, theme }) =>
      theme?.colors?.boxShadow?.button[buttonType]?.hover};
  }

  &:active {
    background-color: ${({ buttonType, theme }) =>
      theme?.colors?.background?.button[buttonType]?.active};
  box-shadow: ${({ buttonType, theme }) =>
    theme?.colors?.boxShadow?.button[buttonType]?.active};
  }

  &:focus-visible {
    background-color: ${({ buttonType, theme }) =>
      theme?.colors?.background?.button[buttonType]?.focusVisible};
  box-shadow: ${({ buttonType, theme }) =>
    theme?.colors?.boxShadow?.button[buttonType]?.focusVisible};
  }
`;

Button.defaultProps = {
  buttonType: 'primary',
};
