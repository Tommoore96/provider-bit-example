import { JourneyManager, ScreenComponent, Step } from '../../types';
import { validateScreenComponents as validateScreenComponentsPrivate } from '../validate-screen-components';
import { setStepValidity as setStepValidityPrivate } from '../set-step-validity';

const dependencies = {
  validateScreenComponents: validateScreenComponentsPrivate,
  setStepValidity: setStepValidityPrivate,
};

export const validateScreen = (journeyManager: JourneyManager) => (context: string, stepToEvaluate: Step = journeyManager.journeyStorage.currentStep, emitValidationEvent: Boolean = true, deps = dependencies): ScreenComponent[] => {
  const {
    validateScreenComponents,
    setStepValidity,
  } = deps;
  // Find what needs to be done to get to the next step
  const { journeyStorage } = journeyManager;

  const stepCollection = stepToEvaluate.collectables;

  // Call all the validation functions of all of the Components
  // Get the current steps validation function, and run it with the data in the artifact
  const invalidComponents = validateScreenComponents(context, stepToEvaluate.screen.components, stepCollection, journeyStorage);

  // Is this screen valid or not?
  setStepValidity(stepToEvaluate, invalidComponents.length === 0);
  if (!stepToEvaluate.allElementsAreValid && emitValidationEvent) {
    journeyManager.emit('failed_validation', {
      stepToEvaluate,
      invalidComponents,
    }); // This causes the re-render
  }

  return invalidComponents;
};
