import { JourneyManager, StepDefinition } from '../..';
import { progressToNextStep } from './progress-to-next-step';

describe('Journey Renderer', () => {
  describe('updateJourneyArtifact', () => {
    describe('Happy Path', () => {
      // Create our mocks
      const mockJM = {
        emit: jest.fn(),
        validateScreen: jest.fn(),
        journeyStorage: {
          currentStep: {
            continueProgress: false,
          },
        },
      };

      // create our wrapped function
      const progressToNextStepInstance = progressToNextStep(mockJM as unknown as JourneyManager);

      const testCases = [
        {
          desc: 'When screen is valid',
          mocks: {
            validateScreenResult: [],
          },
          emits: true,
          methodResult: [],
        },
        {
          desc: 'When screen is not valid',
          mocks: {
            validateScreenResult: ['comp-1'],
          },
          emits: false,
          methodResult: ['comp-1'],
        },
      ];

      testCases.forEach((testCase) => {
        describe(testCase.desc, () => {
          let methodResult = [];
          beforeAll(() => {
            // Setup Mock
            mockJM.validateScreen.mockReturnValueOnce(testCase.mocks.validateScreenResult);

            // Call the result
            methodResult = progressToNextStepInstance();
          });

          afterAll(() => {
            mockJM.emit.mockReset();
            mockJM.validateScreen.mockReset();
          });

          test('validateScreen should be called with next context', () => {
            expect(mockJM.validateScreen).toHaveBeenCalledWith('next');
          });

          if (testCase.emits) {
            test('Emit should be called with direction next and currentStep', () => {
              expect(mockJM.emit).toHaveBeenCalledWith('journey_progression', {
                direction: 'next',
                leavingStep: mockJM.journeyStorage.currentStep,
              });
            });
          } else {
            test('Emit should be called with direction next and currentStep', () => {
              expect(mockJM.emit).not.toHaveBeenCalled();
            });
          }

          test('Should return an empty array from validateScreen', () => {
            expect(methodResult).toEqual(testCase.methodResult);
          });
        });
      });
    });
  });
});
