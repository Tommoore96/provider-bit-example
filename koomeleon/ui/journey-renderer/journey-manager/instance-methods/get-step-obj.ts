import { JourneyManager } from '../../types';

export const getStepObj = (journeyManager: JourneyManager) => (stepName: string) => journeyManager.journeyStorage.enrichedJourney.steps.find((step) => step.stepName === stepName);
