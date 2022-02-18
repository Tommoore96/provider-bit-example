import { Step } from '..';
import { setStepValidity } from './set-step-validity';

describe('Journey Renderer', () => {
  describe('setStepValidity', () => {
    describe('Happy Path', () => {
      describe('Sets given step to be validity given', () => {
        const fakeStep = {
          allElementsAreValid: undefined,
        };

        beforeAll(() => {
          // Call the function
          setStepValidity(fakeStep as unknown as Step, false);
        });

        test('Returns the invalid mock component as invalid', () => {
          expect(fakeStep.allElementsAreValid).toEqual(false);
        });
      });
    });
  });
});
