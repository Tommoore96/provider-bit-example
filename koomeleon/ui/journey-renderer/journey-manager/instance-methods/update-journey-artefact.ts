import { JourneyManager } from '../../types';

export const updateJourneyArtifact = (journeyManager: JourneyManager) => (artefactName, artifactValue) : void => {
  const { currentStep } = journeyManager.journeyStorage;

  // Create this steps artifact if it does not exist
  const thisStepsCollectable = currentStep.collectables;

  // Write the change to storage
  thisStepsCollectable[artefactName] = artifactValue;

  // Let the render know this element has now changed
  currentStep.screen.components.forEach((component) => {
    const { artefactName: localArtefactName } = component;
    if (localArtefactName === artefactName) {
      component.elementHasChanged = true;
    }
  });

  journeyManager.emit('artifact_update', {
    thisStepsCollectable,
    stepName: currentStep.stepName,
    artefactName,
    artifactValue,
  });

  journeyManager.log('Artifact Update', journeyManager.journeyStorage);
};
