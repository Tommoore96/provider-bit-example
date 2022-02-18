import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { getJourneyManager } from '.';
import { JourneyDisplay } from './journey-display';
import { exampleJourney } from './example-data/demo-journey';

const queryButton = (name: RegExp | string) => screen.queryByRole('button', { name });
const testIdTextContent = (testId) => screen.getByTestId(testId).textContent;
describe('JourneyRenderer', () => {

  describe('E2E', () => {
    test('Given a JourneyDefinition with all features, check they all work!', () => {

      // Create a real JM
      const ourJM = getJourneyManager(exampleJourney);


      // Render the Journey
      render(<JourneyDisplay journeyManager={ourJM} />);

      // Go through it
      // Find the first progress button and click it
      expect(queryButton(/next/i)).toBeVisible();
      fireEvent.click(queryButton(/next/i));

      // Check we are on step 2
      expect(screen.getByText(/This is the middle of the Journey!/i)).toBeVisible();

      // Check the current value of the component is valid
      // As it should be valid on render, but invalid on next
      expect(testIdTextContent('input-is-valid')).toBe('Valid? true');

      // Type a valid input and check it is still valid
      screen.getByRole('textbox').focus();
      userEvent.keyboard('s');
      expect(testIdTextContent('input-is-valid')).toBe('Valid? true');

      // Finish typing an invalid input and check it's invalid
      userEvent.keyboard('top');
      expect(testIdTextContent('input-is-valid')).toBe('Valid? false');

      // Try to progress with this invalid input
      // Check we do not progress
      expect(queryButton(/next/i)).toBeVisible();
      fireEvent.click(queryButton(/next/i));
      expect(queryButton(/next/i)).toBeVisible();


      // Get the back button and click it checking we go back
      const secondBackButton = screen.getByText(/Go back/i);
      fireEvent.click(secondBackButton);
      expect(secondBackButton).not.toBeVisible();

      // If so, go forward again
      expect(queryButton(/next/i)).toBeVisible();
      fireEvent.click(queryButton(/next/i));

      // Remove one char from the input so it's valid once more
      // Then go forward
      screen.getByRole('textbox').focus();
      userEvent.keyboard('{Backspace}');
      expect(testIdTextContent('input-is-valid')).toBe('Valid? true');
      fireEvent.click(queryButton(/next/i));

      // Check we got to the end and we can see what we typed in
      const lastScreenText = screen.getByText(/Success! sto/i);
      expect(lastScreenText).toBeVisible();


    });
  });
});
