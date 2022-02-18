import { JourneyManager } from '../../types';

export const progressToNextStep = (journeyManager: JourneyManager) => () => {
  const { currentStep } = journeyManager.journeyStorage;

  // First validate the screen
  const invalidComponents = journeyManager.validateScreen('next');
  if (invalidComponents.length === 0) {
    // Is valid, so can progress

    // Mark the current step as progress-able
    currentStep.continueProgress = true;

    // Now emit an event that will cause a re-rendering
    // Re-rendering will look for the correct step to display, and that will now go past this step
    journeyManager.emit('journey_progression', {
      direction: 'next',
      leavingStep: currentStep,
    });

    return [];
  }

  return invalidComponents;
};
