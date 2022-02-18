import { JourneyManager } from '../..';
import { findFirstUnprogressedStep } from './find-first-unprogressed-step';

describe('Journey Renderer', () => {
  describe('findFirstUnprogressedStep', () => {
    describe('Happy Path', () => {
      // Create our mocks
      const mockJM = {
        log: jest.fn(),
        findFirstUnprogressedStep: jest.fn(),
        validateScreen: jest.fn(),
        getStepObj: jest.fn(),
        journeyStorage: { },
      };

      let findFirstUnprogressedStepInstance;
      beforeAll(() => {
        // create our wrapped function
        findFirstUnprogressedStepInstance = findFirstUnprogressedStep(mockJM as unknown as JourneyManager);
      });

      describe('If the given step name is invalid, return it', () => {
        const fakeStepObj = {
          continueProgress: undefined,
          nextIf: [],
          collectables: {},
        };

        let resultStep;
        beforeAll(() => {
          mockJM.validateScreen.mockReturnValueOnce(['an-item']);
          mockJM.getStepObj.mockReturnValueOnce(fakeStepObj);

          // Call the function
          resultStep = findFirstUnprogressedStepInstance('step-name');
        });

        test('Calls validateScreen with next context and no emit', () => {
          expect(mockJM.validateScreen).toHaveBeenCalledWith('next', fakeStepObj, false);
        });

        test('returns same step-name string object', () => {
          expect(resultStep).toBe('step-name');
        });
      });

      describe('If the given step name is valid, but has not progressed, return it', () => {
        const fakeStepObj = {
          continueProgress: false,
          nextIf: [],
          collectables: {},
        };

        let resultStep;
        beforeAll(() => {
          mockJM.validateScreen.mockReturnValueOnce(['an-item']);
          mockJM.getStepObj.mockReturnValueOnce(fakeStepObj);

          // Call the function
          resultStep = findFirstUnprogressedStepInstance('step-name');
        });

        test('returns same step-name string object', () => {
          expect(resultStep).toBe('step-name');
        });
      });

      describe('If the given step name is valid, and has progressed, run the forkFunction and return its step name', () => {
        const forkFuncMock = jest.fn();

        const fakeStepObj = {
          continueProgress: true,
          nextIf: [{
            step: 'next-step',
            forkFunction: forkFuncMock,
          }],
          collectables: {},
        };

        const fakeNextStepObj = {
          previousStep: {},
        };

        let resultStep;
        beforeAll(() => {
          mockJM.validateScreen.mockReturnValueOnce([]);
          mockJM.getStepObj.mockReturnValueOnce(fakeStepObj);
          mockJM.getStepObj.mockReturnValueOnce(fakeNextStepObj);
          mockJM.findFirstUnprogressedStep.mockReturnValueOnce('next-step');
          forkFuncMock.mockReturnValue(true);

          // Call the function
          resultStep = findFirstUnprogressedStepInstance('step-name');
        });

        test('returns same step-name string object', () => {
          expect(resultStep).toBe('next-step');
        });
      });

      describe('If the given step name is valid, and has progressed, run the many forkFunctions and return its step name', () => {
        const fakeStepObj = {
          continueProgress: true,
          nextIf: [{
            step: 'next-step',
            forkFunction: jest.fn().mockReturnValueOnce(false),
          }, {
            step: 'alt-step',
            forkFunction: jest.fn().mockReturnValueOnce(true), // code should stop at this point as it's the first true
          }, {
            step: 'not-step',
            forkFunction: jest.fn().mockReturnValueOnce(true),
          }],
          collectables: {},
        };

        const fakeNextStepObj = {
          previousStep: {},
        };

        let resultStep;
        beforeAll(() => {
          mockJM.validateScreen.mockReturnValueOnce([]);
          mockJM.getStepObj.mockReturnValueOnce(fakeStepObj);
          mockJM.getStepObj.mockReturnValueOnce(fakeNextStepObj);
          mockJM.findFirstUnprogressedStep.mockReturnValueOnce('alt-step');

          // Call the function
          resultStep = findFirstUnprogressedStepInstance('step-name');
        });

        test('returns same step-name string object', () => {
          expect(resultStep).toBe('alt-step');
        });
      });
    });
  });
});
