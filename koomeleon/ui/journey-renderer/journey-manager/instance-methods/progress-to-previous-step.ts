import { JourneyManager } from '../../types';

export const progressToPreviousStep = (journeyManager: JourneyManager) => () :void => {
  // Set the previous step as not continuable
  journeyManager.journeyStorage.currentStep.previousStep.continueProgress = false;
  journeyManager.emit('journey_progression', {
    direction: 'back',
    leavingStep: journeyManager.journeyStorage.currentStep,
    enteringStep: journeyManager.journeyStorage.currentStep.previousStep
  });
};
