import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { JourneyManager } from '.';
import { JourneyDisplay } from './journey-display';

describe('JourneyDisplay', () => {
  // Create our big mock JM
  const mockJM = {
    log: jest.fn(),
    on: jest.fn(),
    off: jest.fn(),
    calculateCurrentStepAndHandleTransition: jest.fn(),
    updateJourneyArtifact: jest.fn(),
    validateScreen: jest.fn(),
    progressToNextStep: jest.fn(),
    progressToPreviousStep: jest.fn(),
    journeyStorage: {
      currentStep: {
        allElementsAreValid: false,
        collectables: {},
        stepName: 'test-step',
        screen: {
          components: [],
        },
      },
    },
  };

  // After each test, reset all the mocks of the shared JM
  afterEach(() => {
    mockJM.log.mockReset();
    mockJM.on.mockReset();
    mockJM.off.mockReset();
    mockJM.calculateCurrentStepAndHandleTransition.mockReset();
    mockJM.updateJourneyArtifact.mockReset();
    mockJM.validateScreen.mockReset();
    mockJM.progressToNextStep.mockReset();
    mockJM.progressToPreviousStep.mockReset();
  });

  describe('Render', () => {
    test('Given a Journey Manager with Components, check Lifecycle methods are called', () => {
      // Create a journey with a single step, with a single component, that is a progression button
      mockJM.journeyStorage.currentStep.screen.components = [
        {
          causesProgression: undefined,
          artefactName: undefined,
          Element: (props) => <button {...props}>Hello World</button>,
          getProps: jest.fn(),
          elementIsValid: false,
          elementHasChanged: false,
        },
        {
          causesProgression: undefined,
          artefactName: undefined,
          Element: (props) => <button {...props}>Hello World</button>,
          elementIsValid: false,
          elementHasChanged: false,
        },
      ];

      // Render the Journey
      render(<JourneyDisplay journeyManager={mockJM as unknown as JourneyManager} />);

      // Check on event listener was called
      expect(mockJM.on).toHaveBeenNthCalledWith(1, 'artifact_update', expect.anything());
      expect(mockJM.on).toHaveBeenNthCalledWith(2, 'journey_progression', expect.anything());
      expect(mockJM.on).toHaveBeenNthCalledWith(3, 'failed_validation', expect.anything());

      // Check calculateCurrentStepAndHandleTransition was called
      expect(mockJM.calculateCurrentStepAndHandleTransition).toHaveBeenCalled();

      // Check the first components "getProps" function was called
      expect(mockJM.journeyStorage.currentStep.screen.components[0].getProps).toHaveBeenCalled();
    });
  });

  describe('Progression', () => {
    test('Given a Journey Manager with a forward progress button, clicking it triggers the next step function', () => {
      // Create a journey with a single step, with a single component, that is a progression button
      mockJM.journeyStorage.currentStep.screen.components = [
        {
          causesProgression: 'NEXT',
          artefactName: undefined,
          Element: (props) => <button {...props}>Hello World</button>,
          getProps: jest.fn(),
          elementIsValid: false,
          elementHasChanged: false,
        },
      ];

      // Render the Journey
      render(<JourneyDisplay journeyManager={mockJM as unknown as JourneyManager} />);

      // Get the progress button - check it is there
      const progressButton = screen.getByText(/Hello World/i);
      expect(progressButton).toBeVisible();

      // Click it
      fireEvent.click(progressButton);

      // Check the "nextStep" function was called
      expect(mockJM.progressToNextStep).toHaveBeenCalled();
    });

    test('Given a Journey Manager with no progression button, clicking it does nothing', () => {
      // Create a journey with a single step, with a single component, that is a progression button
      mockJM.journeyStorage.currentStep.screen.components = [
        {
          causesProgression: undefined,
          artefactName: undefined,
          Element: (props) => <button {...props}>Hello World</button>,
          getProps: jest.fn(),
          elementIsValid: false,
          elementHasChanged: false,
        },
      ];

      // Render the Journey
      render(<JourneyDisplay journeyManager={mockJM as unknown as JourneyManager} />);

      // Get the progress button - check it is there
      const progressButton = screen.getByText(/Hello World/i);
      expect(progressButton).toBeVisible();

      // Click it
      fireEvent.click(progressButton);

      // Check the "nextStep" function was called
      expect(mockJM.progressToNextStep).not.toHaveBeenCalled();
    });

    test('Given a Journey Manager with a backwards progress button, clicking it triggers the next step function', () => {
      // Create a journey with a single step, with a single component, that is a progression button
      mockJM.journeyStorage.currentStep.screen.components = [
        {
          causesProgression: 'BACK',
          artefactName: undefined,
          Element: (props) => <button {...props}>Hello World</button>,
          getProps: jest.fn(),
          elementIsValid: false,
          elementHasChanged: false,
        },
      ];

      // Render the Journey
      render(<JourneyDisplay journeyManager={mockJM as unknown as JourneyManager} />);

      // Get the progress button - check it is there
      const progressButton = screen.getByText(/Hello World/i);
      expect(progressButton).toBeVisible();

      // Click it
      fireEvent.click(progressButton);

      // Check the "nextStep" function was called
      expect(mockJM.progressToPreviousStep).toHaveBeenCalled();
    });
  });

  describe('Event Listeners', () => {
    test('Given a Journey Manager with an input with an artifact, typing a valid value into it triggers onChange and no log', () => {
      // Create a journey with a single step, with a single component, that is a progression button
      mockJM.journeyStorage.currentStep.screen.components = [
        {
          causesProgression: undefined,
          artefactName: 'art-1',
          Element: (props) => <input data-testid="input-comp" type="text" {...props} />,
          getProps: jest.fn(),
          elementIsValid: false,
          elementHasChanged: false,
        },
      ];

      // Mock a valid screen
      mockJM.validateScreen.mockReturnValue([]);

      // Render the Journey
      render(<JourneyDisplay journeyManager={mockJM as unknown as JourneyManager} />);

      // Get the progress button - check it is there
      const progressButton = screen.getByTestId('input-comp');
      expect(progressButton).toBeVisible();

      // Focus on it and type
      progressButton.focus();
      userEvent.keyboard('hello');

      // Check the "updateJourneyArtifact" function was called
      expect(mockJM.updateJourneyArtifact).toHaveBeenNthCalledWith(1, 'art-1', 'h');
      expect(mockJM.updateJourneyArtifact).toHaveBeenNthCalledWith(2, 'art-1', 'he');
      expect(mockJM.updateJourneyArtifact).toHaveBeenNthCalledWith(3, 'art-1', 'hel');
      expect(mockJM.updateJourneyArtifact).toHaveBeenNthCalledWith(4, 'art-1', 'hell');
      expect(mockJM.updateJourneyArtifact).toHaveBeenNthCalledWith(5, 'art-1', 'hello');

      // Check validateScreen was called with render context
      expect(mockJM.validateScreen).toHaveBeenCalledWith('render');

      // Check we did not log invalid components
      expect(mockJM.log).not.toHaveBeenCalled();
    });

    test('Given a Journey Manager with an input with an artifact, typing an invalid value into it triggers onChange and a log', () => {
      // Create a journey with a single step, with a single component, that is a progression button
      mockJM.journeyStorage.currentStep.screen.components = [
        {
          causesProgression: undefined,
          artefactName: 'art-1',
          Element: (props) => <input data-testid="input-comp" type="text" {...props} />,
          getProps: jest.fn(),
          elementIsValid: false,
          elementHasChanged: false,
        },
      ];

      // Mock an invalid screen
      mockJM.validateScreen.mockReturnValue(['a-component']);

      // Render the Journey
      render(<JourneyDisplay journeyManager={mockJM as unknown as JourneyManager} />);

      // Get the progress button - check it is there
      const progressButton = screen.getByTestId('input-comp');
      expect(progressButton).toBeVisible();

      // Focus on it and type
      progressButton.focus();
      userEvent.keyboard('h');

      // Check the "updateJourneyArtifact" function was called
      expect(mockJM.updateJourneyArtifact).toHaveBeenNthCalledWith(1, 'art-1', 'h');

      // Check validateScreen was called with render context
      expect(mockJM.validateScreen).toHaveBeenCalledWith('render');

      // Check we did not log invalid components
      expect(mockJM.log).toHaveBeenCalledWith('Invalid Components After Artefact Update', ['a-component']);
    });
  });
});
