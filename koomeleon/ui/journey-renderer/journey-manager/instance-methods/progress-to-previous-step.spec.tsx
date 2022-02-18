import { JourneyManager, StepDefinition } from '../..';
import { progressToPreviousStep } from './progress-to-previous-step';

describe('Journey Renderer', () => {
  describe('updateJourneyArtifact', () => {
    describe('Happy Path', () => {
      // Create our mocks
      const mockJM = {
        emit: jest.fn(),
        journeyStorage: {
          currentStep: {
            previousStep: {
              continueProgress: true,
            },
          },
        },
      };

      let progressToPreviousStepInstance;
      beforeAll(() => {
        // create our wrapped function
        progressToPreviousStepInstance = progressToPreviousStep(mockJM as unknown as JourneyManager);

        // Call the result
        progressToPreviousStepInstance();
      });

      test('Sets the CurrentSteps PreviousStep to be unprogressed', () => {
        expect(mockJM.journeyStorage.currentStep.previousStep.continueProgress).toBe(false);
      });

      test('Emit should be called with direction back and currentStep', () => {
        expect(mockJM.emit).toHaveBeenCalledWith('journey_progression', {
          direction: 'back',
          leavingStep: mockJM.journeyStorage.currentStep,
          enteringStep: mockJM.journeyStorage.currentStep.previousStep,
        });
      });
    });
  });
});
