import { JourneyManager, Step } from '../../types';

import { validateScreenComponents as validateScreenComponentsPrivate } from '../validate-screen-components';
import { setStepValidity as setStepValidityPrivate } from '../set-step-validity';

const dependencies = {
  validateScreenComponents: validateScreenComponentsPrivate,
  setStepValidity: setStepValidityPrivate,
};

export const calculateCurrentStepAndHandleTransition = (journeyManager: JourneyManager) => (deps = dependencies): Step => {
  const {
    validateScreenComponents,
    setStepValidity,
  } = deps;

  const { journeyStorage } = journeyManager;

  // Starting with the first step
  // Find the first step that has not been passed
  const stepNameToDisplay = journeyManager.findFirstUnprogressedStep(journeyStorage.enrichedJourney.firstStepName);

  // Get that steps Obj
  const stepObjectToDisplay = journeyManager.getStepObj(stepNameToDisplay);

  // Is there a transition happening? (Is the CurrentStep changing?)
  if (journeyStorage.currentStep !== stepObjectToDisplay) {
    // Is it a "Next" Transition?
    if (journeyStorage.currentStep?.previousStep !== stepObjectToDisplay) {
      // Yes
      if (journeyStorage.currentStep) {
        // Get the initial UI validation state
        const invalidComponents = validateScreenComponents('render', stepObjectToDisplay.screen.components, stepObjectToDisplay.collectables, journeyStorage);
        setStepValidity(stepObjectToDisplay, invalidComponents.length === 0);

        // Does the step we are leaving have an "after" hook?
        if (journeyStorage.currentStep.after?.length > 0) {
          // Run it
          journeyStorage.currentStep.after.forEach((afterFunc) => afterFunc(journeyManager));
        }
      }
    }

    // Does the new step we are entering have a "before" hook?
    if (stepObjectToDisplay.before?.length > 0) {
      // Run it
      stepObjectToDisplay.before.forEach((beforeFunc) => beforeFunc(journeyManager));
    }

    // Update the currentStep to be the new step
    journeyStorage.currentStep = stepObjectToDisplay;
  }

  // Return this step
  return journeyStorage.currentStep;
};
