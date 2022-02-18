import {
  JourneyDefinition, JourneyStorage, JourneyManager, Step, Journey,
} from '../types';
import { calculateCurrentStepAndHandleTransition } from './instance-methods/calculate-current-step';
import { updateJourneyArtifact } from './instance-methods/update-journey-artefact';
import { addStepsToJourney } from './instance-methods/add-steps-to-journey';
import { getStepObj } from './instance-methods/get-step-obj';
import { progressToNextStep } from './instance-methods/progress-to-next-step';
import { progressToPreviousStep } from './instance-methods/progress-to-previous-step';
import { validateScreen } from './instance-methods/validate-screen';
import { findFirstUnprogressedStep } from './instance-methods/find-first-unprogressed-step';

import { enrichSteps } from './enrich-steps';

const eventEmitter = new EventTarget();

export function getJourneyManager(journeyDefinition: JourneyDefinition): JourneyManager {
  // Take input journey and enrich to start state
  const enrichedJourney: Journey = {
    journeyName: journeyDefinition.journeyName,
    firstStepName: journeyDefinition.firstStepName,
    initialState: journeyDefinition.initialState,
    viewBag: journeyDefinition.viewBag,
    steps: [],
  };

  // Take each step and add workflow details to it
  enrichedJourney.steps = enrichSteps(journeyDefinition.steps, journeyDefinition.initialState);

  // Create our storage object, and return scoped functions to operate on it
  const journeyStorage: JourneyStorage = {
    enrichedJourney,
    currentStep: {} as Step, // Soon to be overwritten
  };

  // Do we have any Artefact already?

  // Define it as a Prototype so we can define it with no properties
  // We need this as the manager itself is an input to the properties functions
  const journeyManager: any = {
    journeyStorage,
  };

  // Add all of the worker functions
  journeyManager.calculateCurrentStepAndHandleTransition = calculateCurrentStepAndHandleTransition(journeyManager);
  journeyManager.updateJourneyArtifact = updateJourneyArtifact(journeyManager);
  journeyManager.validateScreen = validateScreen(journeyManager);
  journeyManager.progressToNextStep = progressToNextStep(journeyManager);
  journeyManager.findFirstUnprogressedStep = findFirstUnprogressedStep(journeyManager);
  journeyManager.progressToPreviousStep = progressToPreviousStep(journeyManager);
  journeyManager.addStepsToJourney = addStepsToJourney(journeyManager);
  journeyManager.getStepObj = getStepObj(journeyManager);
  journeyManager.on = (eventName, listener) => eventEmitter.addEventListener(eventName, listener);
  journeyManager.off = (eventName, listener) => eventEmitter.removeEventListener(eventName, listener);
  journeyManager.emit = (eventName, detail) => eventEmitter.dispatchEvent(
    new CustomEvent(eventName, { detail, cancelable: true }),
  );
  journeyManager.log = (msg, logObj) => {
    // eslint-disable-next-line no-console
    console.log(msg, logObj);
  };

  // Calculate the Initial step, and the Initial State
  journeyManager.calculateCurrentStepAndHandleTransition();

  // Return our fully fledged prototype as a real, non-optional object
  return {
    ...journeyManager
  };
}
