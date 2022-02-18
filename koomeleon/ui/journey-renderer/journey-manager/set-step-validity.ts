import { Step } from '../types';

export const setStepValidity = (currentStep: Step, isValid: boolean): void => {
  currentStep.allElementsAreValid = isValid;
};
