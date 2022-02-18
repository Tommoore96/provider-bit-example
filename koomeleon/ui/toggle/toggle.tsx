import React from 'react';
import styled from 'styled-components';

export type ToggleProps = {
  /**
   * a text to be rendered in the component.
   */
  checked: boolean;
};

const CheckBoxWrapper = styled.div`
  position: relative;
`;

const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
`;

const CheckBoxLabel = styled.label<ToggleProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  display: flex;
  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: ${({ theme }) => theme?.colors?.background?.toggle.selector || '#FFFFFF'};
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
  ${({ theme, checked }) => {
    const status = checked ? 'on' : 'off'
    return `
    background: ${theme?.colors?.background?.toggle[status]?.default};

    &:hover {
      background: ${theme?.colors?.background?.toggle[status]?.hover};
    }

    &:focus-visible {
      background: ${theme?.colors?.background?.toggle[status]?.focusVisible};
    }

    &:active {
      background: ${theme?.colors?.background?.toggle[status]?.active};
    }
  `;
  }}

  ${({ checked }) =>
    checked &&
    `
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
  `}
`;

export function Toggle(props) {
  return (
    <CheckBoxWrapper>
      <CheckBox id="checkbox" type="checkbox" {...props} />
      <CheckBoxLabel htmlFor="checkbox" {...props} />
    </CheckBoxWrapper>
  );
}
