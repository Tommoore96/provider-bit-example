import { JourneyManager, StepDefinition } from '../..';
import { calculateCurrentStepAndHandleTransition } from './calculate-current-step';

describe('Journey Renderer', () => {
  describe('calculateCurrentStepAndHandleTransition', () => {
    describe('Happy Path', () => {
      // Create our mocks
      const mockJM = {
        log: jest.fn(),
        findFirstUnprogressedStep: jest.fn(),
        getStepObj: jest.fn(),
        journeyStorage: {
          currentStep: {
            before: [],
            after: [],
            previousStep: undefined,
          },
          enrichedJourney: {
            firstStepName: '',
            steps: [],
          },
        },
      };

      let calculateCurrentStepAndHandleTransitionInstance;
      beforeAll(() => {
        // create our wrapped function
        calculateCurrentStepAndHandleTransitionInstance = calculateCurrentStepAndHandleTransition(mockJM as unknown as JourneyManager);
      });

      describe('When step has not changed', () => {
        const fakeStepObj = mockJM.journeyStorage.currentStep;
        const afterMock = jest.fn();
        const beforeMock = jest.fn();
        let resultStep;
        beforeAll(() => {
          mockJM.findFirstUnprogressedStep.mockReturnValueOnce('step-name');
          mockJM.getStepObj.mockReturnValueOnce(fakeStepObj);
          mockJM.journeyStorage.currentStep.before = [beforeMock];
          mockJM.journeyStorage.currentStep.after = [afterMock];

          // Call the function
          resultStep = calculateCurrentStepAndHandleTransitionInstance();
        });

        test('Fires no before hooks', () => {
          expect(beforeMock).not.toHaveBeenCalled();
        });

        test('Fires no after hooks', () => {
          expect(afterMock).not.toHaveBeenCalled();
        });

        test('returns same currentStep object', () => {
          expect(resultStep).toBe(fakeStepObj);
        });
      });

      describe('When step has gone NEXT', () => {
        const afterMock = jest.fn();
        const beforeMock = jest.fn();
        const afterNextMock = jest.fn();
        const beforeNextMock = jest.fn();
        const validateScreenComponentsMock = jest.fn();
        const setStepValidityMock = jest.fn();

        const fakeNextStep = {
          before: [beforeNextMock],
          after: [afterNextMock],
          collectables: {},
          screen: {
            components: [],
          },
        };

        let resultStep;
        beforeAll(() => {
          mockJM.findFirstUnprogressedStep.mockReturnValueOnce('next-step-name');
          mockJM.getStepObj.mockReturnValueOnce(fakeNextStep);
          mockJM.journeyStorage.currentStep.before = [beforeMock];
          mockJM.journeyStorage.currentStep.after = [afterMock];

          validateScreenComponentsMock.mockReturnValueOnce([]);

          // Dependencies
          const deps = {
            validateScreenComponents: validateScreenComponentsMock,
            setStepValidity: setStepValidityMock,
          };
          // Call the function
          resultStep = calculateCurrentStepAndHandleTransitionInstance(deps);
        });

        test('Does not fire currentStep before hooks', () => {
          expect(beforeMock).not.toHaveBeenCalled();
        });

        test('Fire currentStep after hooks passing JourneyManager', () => {
          expect(afterMock).toHaveBeenCalledWith(mockJM);
        });

        test('Fire nextStep before hooks passing JourneyManager', () => {
          expect(beforeNextMock).toHaveBeenCalledWith(mockJM);
        });

        test('Does not fire nextStep after hooks', () => {
          expect(afterNextMock).not.toHaveBeenCalled();
        });

        test('Call validateScreenComponents with render context', () => {
          expect(validateScreenComponentsMock).toHaveBeenCalledWith('render', fakeNextStep.screen.components, fakeNextStep.collectables, mockJM.journeyStorage);
        });

        test('Call setStepValidity true', () => {
          expect(setStepValidityMock).toHaveBeenCalledWith(fakeNextStep, true);
        });

        test('returns same currentStep object', () => {
          expect(resultStep).toBe(fakeNextStep);
        });
      });

      describe('When step has gone BACK', () => {
        const afterMock = jest.fn();
        const beforeMock = jest.fn();
        const afterNextMock = jest.fn();
        const beforeNextMock = jest.fn();
        const validateScreenComponentsMock = jest.fn();
        const setStepValidityMock = jest.fn();

        const fakePrevStep = {
          before: [beforeNextMock],
          after: [afterNextMock],
          collectables: {},
          screen: {
            components: [],
          },
        };

        let resultStep;
        beforeAll(() => {
          mockJM.findFirstUnprogressedStep.mockReturnValueOnce('back-step-name');
          mockJM.getStepObj.mockReturnValueOnce(fakePrevStep);
          mockJM.journeyStorage.currentStep.before = [beforeMock];
          mockJM.journeyStorage.currentStep.after = [afterMock];
          mockJM.journeyStorage.currentStep.previousStep = fakePrevStep;

          validateScreenComponentsMock.mockReturnValueOnce([]);

          // Dependencies
          const deps = {
            validateScreenComponents: validateScreenComponentsMock,
            setStepValidity: setStepValidityMock,
          };
          // Call the function
          resultStep = calculateCurrentStepAndHandleTransitionInstance(deps);
        });

        test('Does not fire currentStep before hooks', () => {
          expect(beforeMock).not.toHaveBeenCalled();
        });

        test('Does not fire currentStep after hooks', () => {
          expect(afterMock).not.toHaveBeenCalled();
        });

        test('Fire prevStep before hooks', () => {
          expect(beforeNextMock).toHaveBeenCalled();
        });

        test('Does not fire prevStep after hooks', () => {
          expect(afterNextMock).not.toHaveBeenCalled();
        });

        test('Does not call validateScreenComponents', () => {
          expect(validateScreenComponentsMock).not.toHaveBeenCalled();
        });

        test('Does not call setStepValidity', () => {
          expect(setStepValidityMock).not.toHaveBeenCalled();
        });

        test('returns same currentStep object', () => {
          expect(resultStep).toBe(fakePrevStep);
        });
      });
    });
  });
});
