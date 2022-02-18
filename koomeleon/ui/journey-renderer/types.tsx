// Definitions, this is the "API" the dev needs to create a Journey against
export interface JourneyDefinition {
  journeyName: string,
  steps: Array<StepDefinition>,
  firstStepName: string,
  viewBag?: {
    themeName: string
  },
  initialState: {
    [name: string]: JourneyStateDefinition
  }
}

export interface StepDefinition {
  stepName: string,
  screen: ScreenDefinition,
  nextIf?: Array<NextIf>
  before?: Array<HookFunction>,
  after?: Array<HookFunction>
}

interface HookFunction {
  (journeyManager: JourneyManager): void
}

export interface ScreenDefinition {
  screenName: string,
  components: Array<ComponentDefinition>
}

export interface ComponentDefinition {
  Element: React.FC,
  causesProgression?: 'NEXT' | 'BACK',
  getProps?(context: GetPropsContext): object,
  validation?(context: ValidationContext): boolean,
  artefactName?: string,
}

// This is the JourneyManager object, used by the consuming application to manipulate the journey
export interface JourneyManager {
  journeyStorage: JourneyStorage,
  calculateCurrentStepAndHandleTransition(): Step,
  updateJourneyArtifact(artefactName: string, artifactValue: string): void,
  validateScreen: (context: 'next' | 'render', stepToEvaluate?: Step, emitValidationEvent?: Boolean) => Array<ScreenComponent>,
  progressToNextStep: () => Array<ScreenComponent>,
  progressToPreviousStep: () => Array<ScreenComponent>,
  findFirstUnprogressedStep(stepNameToEvaluate: string): string,
  addStepsToJourney: (steps: Array<Step>) => void,
  getStepObj: (stepName: string) => Step,
  on(eventName: string, listener: Function): void,
  off(eventName: string, listener: Function): void,
  emit(eventName: string, detail: any): boolean
  log(message: string, logObj: any): void
}

// These are what that JourneyDefinition is transformed into when given to the "getJourneyManager" method
export interface Journey extends JourneyDefinition {
  firstStepName: string,
  steps: Array<Step>
}

export interface Step extends StepDefinition {
  continueProgress: boolean,
  allElementsAreValid: boolean,
  screen: Screen,
  previousStep?: Step,
  collectables: StepCollection
}

export interface Screen extends ScreenDefinition {
  components: Array<ScreenComponent>
}

export interface ScreenComponent extends ComponentDefinition {
  elementIsValid: boolean,
  elementHasChanged: boolean
}

// These are things common to both the Definition and the parsed types, refactored out to be tidy
export interface JourneyStorage {
  currentStep: Step,
  enrichedJourney: Journey
}

interface NextIf {
  forkFunction: ForkFunction,
  step: string
}

interface ForkFunction {
  ({stepCollection: StepCollection, journeyStorage: JourneyStorage, journeyManager: JourneyManager}): boolean
}

interface Artefact { }

export interface StepCollection extends Object { }

export interface JourneyStateDefinition {
  stepName: string,
  progressed: boolean,
  collectables: StepCollection
}

interface GetPropsContext {
  elementHasChanged: boolean,
  elementIsValid: boolean,
  elementArtefact: Artefact,
  screenIsValid: boolean,
  stepCollection: StepCollection,
  journeyStorage: JourneyStorage,
  journeyManager: JourneyManager
}

interface ValidationContext {
  renderContext: string,
  elementHasChanged: boolean,
  elementArtefact: Artefact,
  stepCollection: StepCollection,
  journeyStorage: JourneyStorage
}
