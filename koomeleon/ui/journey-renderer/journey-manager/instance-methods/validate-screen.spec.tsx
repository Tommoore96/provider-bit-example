import { JourneyManager, StepDefinition } from '../..';
import { validateScreen } from './validate-screen';

describe('Journey Renderer', () => {
  describe('validateScreen', () => {
    describe('Happy Path', () => {
      // Create our mocks
      const mockJM = {
        emit: jest.fn(),
        journeyStorage: {
          currentStep: {},
        },
        collectables: {},
      };

      let validateScreenInstance;
      beforeAll(() => {
        // create our wrapped function
        validateScreenInstance = validateScreen(mockJM as unknown as JourneyManager);
      });

      describe('By default the currentStep is used and does emit an event if validation fails', () => {
        const fakeStepObj = {
          collectables: {},
          screen: {
            components: [],
          },
          allElementsAreValid: false,
        };

        // dependencies
        const dependencies = {
          validateScreenComponents: jest.fn(),
          setStepValidity: jest.fn(),
        };

        let resultStep;
        beforeAll(() => {
          // Setup Mocks
          mockJM.journeyStorage.currentStep = fakeStepObj;
          dependencies.validateScreenComponents.mockReturnValueOnce(['an-item']);

          // Call the function
          resultStep = validateScreenInstance('the-context', undefined, undefined, dependencies);
        });

        afterAll(() => {
          mockJM.emit.mockClear();
        });

        test('Calls validateScreenComponents with given context', () => {
          expect(dependencies.validateScreenComponents).toBeCalledWith('the-context', fakeStepObj.screen.components, fakeStepObj.collectables, mockJM.journeyStorage);
        });

        test('Calls setStepValidity with correct validity', () => {
          expect(dependencies.setStepValidity).toBeCalledWith(fakeStepObj, false);
        });

        test('Does fire a failed_validation event', () => {
          expect(mockJM.emit).toHaveBeenCalledWith('failed_validation', {
            stepToEvaluate: fakeStepObj,
            invalidComponents: ['an-item'],
          });
        });
      });

      describe('By default the currentStep is used and does not emit an event if validation passes', () => {
        const fakeStepObj = {
          collectables: {},
          screen: {
            components: [],
          },
          allElementsAreValid: true,
        };

        // dependencies
        const dependencies = {
          validateScreenComponents: jest.fn(),
          setStepValidity: jest.fn(),
        };

        let resultStep;
        beforeAll(() => {
          // Setup Mocks
          mockJM.journeyStorage.currentStep = fakeStepObj;
          dependencies.validateScreenComponents.mockReturnValueOnce([]);

          // Call the function
          resultStep = validateScreenInstance('the-context', undefined, undefined, dependencies);
        });

        test('Calls validateScreenComponents with given context', () => {
          expect(dependencies.validateScreenComponents).toBeCalledWith('the-context', fakeStepObj.screen.components, fakeStepObj.collectables, mockJM.journeyStorage);
        });

        test('Calls setStepValidity with correct validity', () => {
          expect(dependencies.setStepValidity).toBeCalledWith(fakeStepObj, true);
        });

        test('Does not fire a failed_validation event', () => {
          expect(mockJM.emit).not.toHaveBeenCalled();
        });
      });

      describe('Uses the step given, and emitEvent given', () => {
        const fakeStepObj = {
          collectables: {},
          screen: {
            components: [],
          },
          allElementsAreValid: true,
        };

        const fakeCurrentStep = {};

        // dependencies
        const dependencies = {
          validateScreenComponents: jest.fn(),
          setStepValidity: jest.fn(),
        };

        let resultStep;
        beforeAll(() => {
          // Setup Mocks
          mockJM.journeyStorage.currentStep = fakeCurrentStep;
          dependencies.validateScreenComponents.mockReturnValueOnce(['an-item']);

          // Call the function
          resultStep = validateScreenInstance('the-context', fakeStepObj, false, dependencies);
        });

        test('Calls validateScreenComponents with given context', () => {
          expect(dependencies.validateScreenComponents).toBeCalledWith('the-context', fakeStepObj.screen.components, fakeStepObj.collectables, mockJM.journeyStorage);
        });

        test('Calls validateScreenComponents with given step not currentStep', () => {
          expect(dependencies.validateScreenComponents.mock.calls[0][2]).toBe(fakeStepObj.collectables);
        });

        test('Calls setStepValidity with correct validity', () => {
          expect(dependencies.setStepValidity).toBeCalledWith(fakeStepObj, false);
        });

        test('Does not fire a failed_validation event because emitEvent is false', () => {
          expect(mockJM.emit).not.toHaveBeenCalled();
        });
      });
    });
  });
});
