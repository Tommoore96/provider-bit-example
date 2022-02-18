import {
  StepDefinition, Step, ScreenComponent, Screen, ComponentDefinition,
} from '..';

const dependencies = {
  enrichComponent: enrichComponentPrivate,
  populateCollectables: populateCollectablesPrivate,
};

export const enrichSteps = (
  steps: Array<StepDefinition>,
  initialState: Object = {},
  deps = dependencies,
): Array<Step> => steps.map((initialStepDefinition): Step => {
  const {
    enrichComponent,
    populateCollectables,
  } = deps;
  // Do we have starting state for this step?
  const stepInitialState = initialState[initialStepDefinition.stepName] || {};

  // For this step, transform it's screen elements
  const enrichedScreen: Screen = {
    ...initialStepDefinition.screen,
    components: initialStepDefinition.screen.components.map(enrichComponent),
  };

  // Populate Collectables object
  const collectables = initialStepDefinition.screen.components.reduce(populateCollectables(stepInitialState), {});

  // Have we been given an initialState for progressed? Else false
  const continueProgress = stepInitialState?.progressed || false;
  return {
    ...initialStepDefinition,
    screen: enrichedScreen,
    continueProgress, // Tells JM if this screen is "done", more than just "valid"
    allElementsAreValid: false, // Used to determine if the whole screen is valid or not
    collectables,
  };
});

function enrichComponentPrivate(compDef: ComponentDefinition): ScreenComponent {
  return {
    ...compDef,
    elementIsValid: !compDef.validation, // If there is no validation method, it cannot be false
    elementHasChanged: false, // init state is unchanged, used in validation
  };
}

function populateCollectablesPrivate(initialState: any): (previousValue: Object, compDef: ScreenComponent) => Object {
  return (previousValue: Object, compDef: ScreenComponent): Object => {
    const resultObj = {};
    if (compDef.artefactName) {
      resultObj[compDef.artefactName] = undefined;
      if(initialState && initialState.collectables && initialState.collectables[compDef.artefactName]) {
        resultObj[compDef.artefactName] = initialState.collectables[compDef.artefactName];
      }
    }

    return {
      ...previousValue,
      ...resultObj,
    };
  };
}

export { enrichComponentPrivate as enrichComponent, populateCollectablesPrivate as populateCollectables };
