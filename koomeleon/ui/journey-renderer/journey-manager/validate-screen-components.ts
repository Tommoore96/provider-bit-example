import { ScreenComponent, StepCollection, JourneyStorage } from '..';

export const validateScreenComponents = (
  renderContext: string,
  components: ScreenComponent[],
  stepCollection: StepCollection,
  journeyStorage: JourneyStorage,
): ScreenComponent[] => {
  const invalidComponents = [];
  components.forEach((component: ScreenComponent) => {
    const { artefactName, validation, elementHasChanged } = component;
    // Is this Component validated?

    if (validation) {
      const elementArtefact = stepCollection[artefactName];
      component.elementIsValid = validation({
        renderContext, elementHasChanged, elementArtefact, stepCollection, journeyStorage,
      });
      if (!component.elementIsValid) {
        invalidComponents.push(component);
      }
    }
  });

  return invalidComponents;
};
