import React from 'react';
import {
  RadioButton,
  RadioButtonProps,
} from '@koodoo/koomeleon.ui.radio-button';
import { ErrorMessage } from '@koodoo/koomeleon.ui.error-message';
import styled from 'styled-components';

export type RadioGroupProps = {
  /**
   * Radio button objects to display.
   */
  radioButtons: RadioButtonProps[];
  /**
   * An error message to display if the radio button prop `error` is `true`.
   */
  errorMessage?: string;
  /**
   * The name of the fieldset to group the radio button options.
   */
  fieldSet: string;
  /**
   * Function to handle value changes.
   */
  onValueChange?: Function;
  /**
   * Parameter to determine the value of the selected input component.
   */
  value: (string | number | readonly string[]) & (string | number | boolean);
};

const Container = styled.div`
  &:not(:last-of-type) {
    margin: 0 0 12px 0;
  }
`;

export function RadioGroup({
  errorMessage,
  radioButtons,
  fieldSet,
  onValueChange,
  value,
}: RadioGroupProps) {
  return (
    <fieldset data-testid="radio-group-fieldset" id={fieldSet}>
      {radioButtons.map((radioButtonProps: RadioButtonProps, index: number) => {
        return (
          <Container
            data-testid={`radio-group-button-${index}`}
            key={'radio-button-container#' + fieldSet + index}
          >
            <RadioButton
              checked={value === radioButtonProps.value}
              onValueChange={onValueChange}
              key={'radio-button#' + fieldSet + index}
              name={fieldSet}
              error={!!errorMessage}
              {...radioButtonProps}
            />
          </Container>
        );
      })}

      {!!errorMessage && (
        <ErrorMessage data-testid="radio-group-error-message">
          {errorMessage}
        </ErrorMessage>
      )}
    </fieldset>
  );
}
