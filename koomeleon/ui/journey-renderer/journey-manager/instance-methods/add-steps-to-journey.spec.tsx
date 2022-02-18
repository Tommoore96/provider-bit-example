import { JourneyManager, StepDefinition } from '../..';
import { addStepsToJourney } from './add-steps-to-journey';

describe('Journey Renderer', () => {
  describe('addStepsToJourney', () => {
    describe('Happy Path', () => {
      // Create our mocks
      const mockJM = {
        log: jest.fn(),
        journeyStorage: {
          enrichedJourney: {
            steps: [],
            initialState: {}
          },
        },
      };
      
      const steps: Array<StepDefinition> = [];

      let addStepsToJourneyInstance;
      const mockEnrichSteps = jest.fn().mockReturnValue([]);
      beforeAll(() => {
        // create our wrapped function
        addStepsToJourneyInstance = addStepsToJourney(mockJM as unknown as JourneyManager);

        // Call the result
        addStepsToJourneyInstance(steps, { enrichSteps: mockEnrichSteps });
      });

      test('Instance calls enrichSteps with given steps', () => {
        expect(mockEnrichSteps).toHaveBeenCalledWith(steps, mockJM.journeyStorage.enrichedJourney.initialState);
      });
    });
  });
});
