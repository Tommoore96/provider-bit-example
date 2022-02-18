import React from 'react';
import {
  RadioButton,
  RadioButtonProps,
} from '@koodoo/koomeleon.ui.radio-button';
import { ErrorMessage } from '@koodoo/koomeleon.ui.error-message';
import styled from 'styled-components';

export type RadioFieldProps = {
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
  margin: 1rem;
`;

export function RadioField({
  errorMessage,
  radioButtons,
  fieldSet,
  onValueChange,
  value,
}: RadioFieldProps) {
  return (
    <fieldset data-testid="radio-field-fieldset" id={fieldSet}>
      {radioButtons.map((radioButtonProps: RadioButtonProps, index: number) => {
        return (
          <Container
            data-testid={`radio-field-button-${index}`}
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
      <Container>
        {!!errorMessage && (
          <ErrorMessage data-testid="radio-field-error-message">
            {errorMessage}
          </ErrorMessage>
        )}
      </Container>
    </fieldset>
  );
}
