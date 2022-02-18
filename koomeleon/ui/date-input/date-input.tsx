import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { ErrorMessage } from '@koodoo/koomeleon.ui.error-message';
import {
  ComponentComposition,
  ComponentName,
  GetFontCSSForDefaultComposition,
} from '@koodoo/koomeleon.utils.font';

const isBackspace = (event) => event.keyCode === 8

const isNumberKey = (event) => {
  if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) {
    return true
  }
  return false
}

export type DateInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  /**
   * Message to be displayed when the input is invalid.
   */
  errorMessage?: string;
  /**
   * Any extra props to be passed to the day input section
   */
  dayProps?: React.InputHTMLAttributes<HTMLInputElement> & {
    defaultValue: string;
  };
  /**
   * Any extra props to be passed to the month input section
   */
  monthProps?: React.InputHTMLAttributes<HTMLInputElement> & {
    defaultValue: string;
  };
  /**
   * Any extra props to be passed to the year input section
   */
  yearProps?: React.InputHTMLAttributes<HTMLInputElement> & {
    defaultValue: string;
  };
  /**
   * A function that is called whenever the value changes with an object containing
   * the keys `day`, `month` & `year`.
   */
  onValueChange: ({
    day,
    month,
    year,
  }: {
    day: string;
    month: string;
    year: string;
  }) => any;
};

type DateInputContainerProps = {
  children: React.ReactNode;
  valid?: boolean;
};

type StyledDateInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  middle?: boolean;
} & Omit<any, 'type'>;

const InputContainer = styled.div<DateInputContainerProps>`
  align-items: stretch;
  border-radius: ${({ theme }) => theme?.content?.borderRadius?.inputField}px;
  box-shadow: ${({ theme }) =>
    theme?.colors?.boxShadow?.inputField?.default ||
    '0px 0px 0px 1px #E2E5ED inset'};
  display: flex;
  padding: 16px;
  position: relative;

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }

  &:focus-within {
    box-shadow: ${({ theme }) =>
    theme?.colors?.boxShadow?.inputField?.focusWithin ||
    '0px 0px 0px 1px #495CE9 inset, 0px 0px 0px 4px #C8CEF8'};
  }
  &:active {
    box-shadow: ${({ theme }) =>
    theme?.colors?.boxShadow?.inputField?.active ||
    '0px 0px 0px 2px #495CE9 inset'};
  }

  ${({ valid, theme }) =>
    !valid &&
    css`
      box-shadow: ${theme?.colors?.boxShadow?.inputField?.error ||
      '0px 0px 0px 2px #FF1F48 inset'};
    `}
`;

const StyledDateInput = styled.input.attrs(
  ({ middle }: { middle: boolean }) => ({
    type: 'number',
    middle,
  })
) <StyledDateInputProps>`
align-items: stretch;
text-align: center;
appearance: none;
background: transparent;
border: none;
  ${({ middle }) =>
    middle &&
    `  
  border-color: #E2E5ED;
  border-style: solid;
  border-width: 0 1px;
  `}
display: flex;
outline: none;
width: calc(100 % / 3);
  :: placeholder {
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

export const DateInput = ({
  dayProps,
  monthProps,
  onValueChange,
  errorMessage,
  yearProps,
  ...props
}: DateInputProps) => {
  const [day, setDay] = useState(dayProps?.defaultValue || '');
  const [month, setMonth] = useState(monthProps?.defaultValue || '');
  const [year, setYear] = useState(yearProps?.defaultValue || '');

  const dayInput = useRef(null);
  const monthInput = useRef(null);
  const yearInput = useRef(null);

  const focusOn = (ref) => ref.current.focus()

  useEffect(() => {
    onValueChange({ day, month, year });
  }, [day, month, year]);

  return (
    <>
      <InputContainer
        valid={!errorMessage}
        onMouseDown={(event) => {
          if (!day && !month && !year) {
            focusOn(dayInput)
            event.preventDefault()
          }
        }}
      >
        <StyledDateInput
          placeholder="DD"
          ref={dayInput}
          onChange={({ target }) => {
            if (target.value.length <= 2) { setDay(target.value) }
          }}
          onKeyUp={(event) => {
            if (!isNumberKey(event)) return
            if (event.target.value.length === 2 || event.target.value > 3) {
              focusOn(monthInput);
            }
          }}
          value={day}
          {...dayProps}
          min={1}
        />
        <StyledDateInput
          middle
          {...props}
          placeholder="MM"
          ref={monthInput}
          onKeyDown={(event) => {
            if (!month.length && isBackspace(event)) {
              focusOn(dayInput)
            }
          }}
          onKeyUp={(event) => {
            if (!isNumberKey(event)) return
            if (month.length === 2 || event.target.value > 1) {
              focusOn(yearInput);
            }
          }}
          onChange={({ target }) =>
            target.value.length <= 2 && setMonth(target.value)
          }
          value={month}
          {...monthProps}
          min={1}
        />
        <StyledDateInput
          placeholder="YYYY"
          ref={yearInput}
          onKeyDown={(event) => {
            if (!year.length && isBackspace(event)) {
              return focusOn(monthInput)
            }
          }}
          onChange={(event) => {
            if (event.target.value.length <= 4) {
              setYear(event.target.value)
            }
          }
          }
          value={year}
          {...yearProps}
        />
      </InputContainer>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </>
  );
};
