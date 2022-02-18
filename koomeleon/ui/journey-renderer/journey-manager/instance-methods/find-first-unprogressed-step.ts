import { JourneyManager } from '../../types';

export const findFirstUnprogressedStep = (journeyManager: JourneyManager) => (stepNameToEvaluate) : string => {
  // We assume the step given has not been passed yet
  // And so it is the next step
  let theNextStepName = stepNameToEvaluate;

  // Now we attempt to disprove that assumption
  // get the step from the Journey
  const thisStepObj = journeyManager.getStepObj(stepNameToEvaluate);

  if (!thisStepObj) {
    journeyManager.log('No next step', stepNameToEvaluate);
    throw new Error('No next step');
  }

  // Is this step valid?
  // Run the Screens validation method, but silently, so as to not fire any events.
  const invalidComponents = journeyManager.validateScreen('next', thisStepObj, false);

  if (invalidComponents.length === 0) {
    // Have we marked this step as passed already?
    if (thisStepObj.continueProgress) {
      // Loop over the nextIf array, looking for the first
      // next step that is satisfied
      for (let i = 0; i < thisStepObj.nextIf.length; i++) {
        const { step, forkFunction } = thisStepObj.nextIf[i];

        const thisStepsArtifact = thisStepObj.collectables;
        const nextIfResult = forkFunction({stepCollection: thisStepsArtifact, journeyStorage: journeyManager.journeyStorage, journeyManager});
        if (nextIfResult) {
          // We found our next step
          theNextStepName = step;
          break;
        }
      }

      // Have we found the next step?
      if (theNextStepName !== stepNameToEvaluate) {
        // Next step found
        // Update it's "previews" step be this step
        const nextStepObj = journeyManager.getStepObj(theNextStepName);
        nextStepObj.previousStep = thisStepObj;

        // Check to see if the next step is satisfied also
        theNextStepName = journeyManager.findFirstUnprogressedStep(theNextStepName);
      } else {
        // If not, something bad has happened
        // As this means a valid result does not have a next step.
        journeyManager.log('No next step', stepNameToEvaluate);
        throw new Error('No next step');
      }
    } // else continueProgress is false, so we want to stop here
  } // else this screen is invalid, so we must stop here

  return theNextStepName;
};
