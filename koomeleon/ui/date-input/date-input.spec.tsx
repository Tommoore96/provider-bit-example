import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DateInput } from '.';

const mockUseTheme = {
  assets: {
    icons: {
      error: () => <div data-testid="error-icon">Mocked Icon</div>,
    },
  },
};

jest.mock('styled-components', () => {
  const originalModule = jest.requireActual('styled-components');
  return {
    __esModule: true,
    ...originalModule,
    useTheme: () => mockUseTheme,
  };
});

describe('DateInput', () => {
  test('auto focuses on day section on click on any part of the input if it is empty', () => {
    render(<DateInput onValueChange={() => null} />);

    const dayInput = screen.getByPlaceholderText('DD');
    const monthInput = screen.getByPlaceholderText('MM');

    userEvent.click(monthInput);

    expect(dayInput).toHaveFocus();
  });

  test('if the day section is not empty then it is not focused on automatically', async () => {
    render(<DateInput onValueChange={() => null} />);

    const dayInput = screen.getByPlaceholderText('DD');
    const monthInput = screen.getByPlaceholderText('MM');
    const yearInput = screen.getByPlaceholderText('YYYY');

    dayInput.focus();

    userEvent.keyboard('2061996');

    fireEvent.click(monthInput);

    await waitFor(() => expect(yearInput).toHaveFocus());

    yearInput.blur();

    fireEvent.click(monthInput);

    expect(dayInput).not.toHaveFocus();
  });

  test('change input focus as the user types', async () => {
    render(<DateInput onValueChange={() => null} />);

    const dayInput = screen.getByPlaceholderText('DD');
    const monthInput = screen.getByPlaceholderText('MM');
    const yearInput = screen.getByPlaceholderText('YYYY');

    dayInput.focus();

    expect(dayInput).toHaveFocus();

    userEvent.keyboard('20');

    await waitFor(() => expect(monthInput).toHaveFocus());

    userEvent.keyboard('12');

    await waitFor(() => expect(yearInput).toHaveFocus());
  });

  test('if the first number in the day section is "3" or less then focus stays with the day section', async () => {
    render(<DateInput onValueChange={() => null} />);

    const dayInput = screen.getByPlaceholderText('DD');

    dayInput.focus();

    userEvent.keyboard('3');

    await waitFor(() => expect(dayInput).toHaveFocus());
  });

  test('if the first number in month section is "1" then focus stays with the month section', async () => {
    render(<DateInput onValueChange={() => null} />);

    const monthInput = screen.getByPlaceholderText('MM');

    monthInput.focus();

    userEvent.keyboard('1');

    await waitFor(() => expect(monthInput).toHaveFocus());
  });

  // Same principle here.  Because a day cannot be a two digit number beginning with a number higher than "three", DateInput automatically 
  // moves focus to the month section of the input, just like in HTML 5 https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date
  // ie if a user types "4" then it must mean the 4th day of the month as there are no other days beginning with a "4", if a user types "1" however it could
  // mean the 1st, or it could be an attempt to get type "10", "11", "12" etc...
  test('if the first number in the day section is higher than "3" then focus moves to month section', async () => {
    render(<DateInput onValueChange={() => null} />);

    const dayInput = screen.getByPlaceholderText('DD');
    const monthInput = screen.getByPlaceholderText('MM');

    dayInput.focus();

    userEvent.keyboard('4');

    await waitFor(() => expect(monthInput).toHaveFocus());
  });

  // Because a month cannot be a two digit number beginning with a number higher than "one", DateInput automatically 
  // moves focus to the year section of the input, just like in HTML 5 https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date
  // ie if a user types "2" then it must mean February as there are no other months beginning with a "2", if a user types "1" however it could
  // mean January, or it could be an attempt to get type "10", "11", or "12".
  test('if the first number in month section is higher than "1" then focus moves to year section', async () => {
    render(<DateInput onValueChange={() => null} />);
    const monthInput = screen.getByPlaceholderText('MM');
    const yearInput = screen.getByPlaceholderText('YYYY');

    monthInput.focus();

    userEvent.keyboard('2');

    await waitFor(() => expect(yearInput).toHaveFocus());
  });

  test('focus moves to different sections as user presses backspace', async () => {
    render(<DateInput onValueChange={() => null} />);

    const dayInput = screen.getByPlaceholderText('DD');
    const monthInput = screen.getByPlaceholderText('MM');

    dayInput.focus();

    userEvent.keyboard('2061996');
    userEvent.keyboard('{backspace}');
    userEvent.keyboard('{backspace}');
    userEvent.keyboard('{backspace}');
    userEvent.keyboard('{backspace}');
    userEvent.keyboard('{backspace}');

    await waitFor(() => expect(monthInput).toHaveFocus());

    userEvent.keyboard('{backspace}');
    userEvent.keyboard('{backspace}');
    userEvent.keyboard('{backspace}');

    await waitFor(() => expect(dayInput).toHaveFocus());
  });

  test('onValueChange is called when text changes', async () => {
    const onValueChange = jest.fn();

    render(<DateInput onValueChange={onValueChange} />);

    const dayInput = screen.getByPlaceholderText('DD');

    dayInput.focus();

    userEvent.keyboard('2061996');

    expect(onValueChange).toHaveBeenCalledTimes(8);
    expect(onValueChange).toHaveBeenLastCalledWith({
      day: '20',
      month: '6',
      year: '1996',
    });
  });

  test('error message is displayed only if one is passed', async () => {
    const { rerender } = render(<DateInput onValueChange={() => null} errorMessage='Oops' />);

    expect(screen.getByText(/oops/i)).toBeVisible();

    rerender(<DateInput onValueChange={() => null} errorMessage='' />)

    expect(screen.queryByText(/oops/i)).toBeFalsy();
  });
})
