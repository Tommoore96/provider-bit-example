import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { JourneyManager, ScreenComponent } from './types';

export type JourneyDisplayProps = {
  /**
     * The controller object for the Journey
     */
  journeyManager: JourneyManager
};

export function JourneyDisplay(props: JourneyDisplayProps): React.ReactElement {
  const {
    journeyManager,
  } = props;

  // This state and useEffect are all there to force the JR to
  // re-render the page when a value is changed or when validation
  // Fails, as both of these might alter the UI
  const [renderCount, setRenderCount] = useState(0);

  const reRenderPage = (journeyRendererEventName, jsEvent) => {
    journeyManager.log(journeyRendererEventName, jsEvent);
    setRenderCount(renderCount + 1);
  };

  useEffect(() => {
    // Listen for store updates that could cause a re-render
    // We declare all of these methods here (As wrappers of a single worker)
    // As we need them all to be unique objects
    // So we can `off` them when the components is re-rendered
    // This avoids and event listener memory leak
    const artifactUpdateEventHandler = (jsEvent) => { reRenderPage('artifact update!', jsEvent); };
    const journeyProgressionEventHandler = (jsEvent) => { reRenderPage('journey progress!', jsEvent); };
    const failedValidationEventHandler = (jsEvent) => { reRenderPage('failed validation!', jsEvent); };

    journeyManager.on('artifact_update', artifactUpdateEventHandler);
    journeyManager.on('journey_progression', journeyProgressionEventHandler);
    journeyManager.on('failed_validation', failedValidationEventHandler);
    return () => {
      journeyManager.off('artifact_update', artifactUpdateEventHandler);
      journeyManager.off('journey_progression', journeyProgressionEventHandler);
      journeyManager.off('failed_validation', failedValidationEventHandler);
    };
  });

  // Calculate the new current step
  if(journeyManager === undefined) {
    console.log('No Journey Manager')
    return <></>
  }

  journeyManager.calculateCurrentStepAndHandleTransition();

  // Get that step from the JM
  const stepObject = journeyManager.journeyStorage.currentStep;

  // Render it
  const getReactElementsFromComponents = ({
    causesProgression, artefactName, Element, getProps, elementIsValid, elementHasChanged,
  }: ScreenComponent) => {
    try {
      // Does this component have a return value that needs to be saved?
      const changeListeners: {
        onChange: Function;
        onValueChange: Function;
        onKeyUp: Function;
        onClick: Function;
      } = {
        onChange: () => { },
        onValueChange: () => { },
        onKeyUp: () => { },
        onClick: () => [],
      };

      if (artefactName) {
        // It does, so add event listeners
        const onChangeWorker = (artefactName, artefactValue) => {
          journeyManager.updateJourneyArtifact(artefactName, artefactValue);

          // validate the whole screen, as this component might effect the validity of another
          const invalidComponents = journeyManager.validateScreen('render');
          if (invalidComponents.length > 0) {
            journeyManager.log('Invalid Components After Artefact Update', invalidComponents);
          }
        };

        // Most components use onChange
        changeListeners.onChange = (e: React.FormEvent<HTMLInputElement>) => {
          onChangeWorker(artefactName, e.currentTarget.value);
        };

        // But RadioButtonGroup uses onValueChange
        changeListeners.onValueChange = (e: string) => {
          onChangeWorker(artefactName, e);
        };

        // changeListeners.onKeyUp = (e) => {
        // Problem, if there is more than one progress-able element, we dont know which one to click!
        //     if (e.key === 'Enter') {
        //         changeListeners.onClick(e);
        //     }
        // }
      }

      // Does this component cause progressions?
      if (causesProgression) {
        changeListeners.onClick = (e: React.MouseEvent<HTMLElement>) => {
          // What kind of progression?
          switch (causesProgression.toUpperCase()) {
            case 'NEXT':

              // run this SCREENS validation
              // if it is valid then we can move progression and update artifact repo
              // if its not, we need to show the validation errors
              journeyManager.log('Next Progression Result', journeyManager.progressToNextStep());
              break;
            case 'BACK':
              journeyManager.progressToPreviousStep();
              break;
            case 'START':
            default:
              journeyManager.log('Not sure what to do with this Progression event', e);
              break;
          }
        };
      }

      // We do this so components with focus (Inputs) are not re-drawn and lose focus on re-render
      let renderKey = ''
      if (artefactName) { 
        renderKey = `${stepObject.stepName}/${artefactName}`;
      } else {
        renderKey =  uuidv4();
      }

      // What props do we need?
      let thisComponentsProps = {
        key:renderKey
      };

      if (getProps) {
        thisComponentsProps = {
          ...thisComponentsProps,
          ...getProps({
            elementHasChanged,
            elementIsValid,
            screenIsValid: stepObject.allElementsAreValid,
            elementArtefact: stepObject.collectables[artefactName],
            stepCollection: stepObject.collectables,
            journeyStorage: journeyManager.journeyStorage,
            journeyManager,
          }),
        };
      }

      return <Element {...changeListeners} {...thisComponentsProps} />;
    } catch (e) {
      debugger;
      return <span>
        Oh dear, looks like {stepObject.stepName} {artefactName} has a problem, {e.message}
      </span>;
    }
  };

  // Assemble the components the render
  const compsToRender = stepObject.screen.components.map(getReactElementsFromComponents);

  return <>{compsToRender} </>;
}
