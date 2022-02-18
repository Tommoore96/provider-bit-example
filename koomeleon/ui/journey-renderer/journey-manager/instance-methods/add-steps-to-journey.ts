import { JourneyManager, StepDefinition } from '../../types';
import { enrichSteps as enrichStepsPrivate } from '../enrich-steps';

const dependencies = {
  enrichSteps: enrichStepsPrivate,
};

export const addStepsToJourney = (journeyManager: JourneyManager) => (steps: Array<StepDefinition>, deps = dependencies) => {
  const { enrichSteps } = deps;

  journeyManager.journeyStorage.enrichedJourney.steps.push(...enrichSteps(steps, journeyManager.journeyStorage.enrichedJourney.initialState));
  journeyManager.log('Latest Journey Steps', journeyManager.journeyStorage.enrichedJourney.steps);
};
