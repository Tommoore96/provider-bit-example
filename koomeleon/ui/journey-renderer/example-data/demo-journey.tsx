import React from 'react';
import { JourneyDefinition } from '../';

export const exampleJourney: JourneyDefinition = {
  journeyName: 'example-journey',
  firstStepName: 'journey-welcome-step',
  initialState: {},
  steps: [
    {
      stepName: 'journey-welcome-step',
      screen: {
        screenName: 'welcome-screen',
        components: [{
          Element: (props) => <p>Welcome to a Demo Journey!</p>,
          getProps: () => ({}),
        },
        {
          causesProgression: 'NEXT',
          Element: (props) => <button {...props}>Go next</button>,
          getProps: () => ({}),
        }],
      },
      nextIf: [
       {
        forkFunction: () => true, // Does not matter, just if they try to move forward they can
        step: 'journey-middle-step',
      }],
    },
    {
      stepName: 'journey-middle-step',
      screen: {
        screenName: 'middle-screen',
        components: [{
          Element: (props) => (<><p>This is the middle of the Journey! You can move back, or forward</p><p>You can also type in this input field to test validation, any value except "stop" is valid</p></>),
          getProps: () => ({}),
        },
        {
          Element: (props) => {
            console.log(props)
            return <p><input type="text" {...props} /><span data-testid="input-is-valid">Valid? {props['elementIsValid'] ? 'true' : 'false'}</span></p>
          },
          getProps: ({
            elementIsValid,
            elementArtefact
          }) => {
            console.log({
              elementIsValid,
              elementArtefact
            })
            return { elementIsValid, value: elementArtefact }
          },
          artefactName: "middle-screen-art-1",
          validation: ({
            elementArtefact,
            renderContext,
            elementHasChanged
          }) => {
            console.log({
              elementArtefact,
              renderContext,
              elementHasChanged
            })
            let isTheTextboxValid = false;

            if (renderContext == 'render') {
              if (!elementHasChanged) {
                isTheTextboxValid = true;
              } else {
                isTheTextboxValid = elementArtefact !== 'stop';
              }
            } else if (renderContext == 'next') {
              isTheTextboxValid = !(elementArtefact === 'stop' || elementArtefact === '' || elementArtefact === undefined)

            }

            return isTheTextboxValid;
          }
        },
        {
          causesProgression: 'BACK',
          Element: (props) => <button {...props}>Go back</button>,
          getProps: () => ({}),
        },
        {
          causesProgression: 'NEXT',
          Element: (props) => <button {...props}>Go next</button>,
          getProps: () => ({}),
        }],
      },
      nextIf: [ {
        forkFunction: ({stepCollection, journeyStorage, journeyManager}) => {
          const currArt = stepCollection['middle-screen-art-1']
          return currArt === 'fail';
        }, // Does not matter, just if they try to move forward they can
        step: 'journey-fail-step',
      },{
        forkFunction: () => true, // Does not matter, just if they try to move forward they can
        step: 'journey-success-step',
      }],
    },
    {
      stepName: 'journey-success-step',
      screen: {
        screenName: 'success-screen',
        components: [{
          Element: (props) => <p>Success! {props['middleScreenArt1']}</p>,
          getProps: ({
            journeyManager
          }) => {
            const artStep = journeyManager.getStepObj("journey-middle-step");
            const middleScreenArt1 = artStep.collectables['middle-screen-art-1'];

            return {
              middleScreenArt1
            }
          },
        },
        {
          causesProgression: 'BACK',
          Element: (props) => <button {...props}>Go back</button>,
          getProps: () => ({}),
        }],
      },
    },
    {
      stepName: 'journey-fail-step',
      screen: {
        screenName: 'fail-screen',
        components: [{
          Element: (props) => <p>FAILURE! {props['middleScreenArt1']}</p>,
          getProps: ({
            journeyManager
          }) => {
            const artStep = journeyManager.getStepObj("journey-middle-step");
            const middleScreenArt1 = artStep.collectables['middle-screen-art-1'];

            return {
              middleScreenArt1
            }
          },
        },
        {
          causesProgression: 'BACK',
          Element: (props) => <button {...props}>Go back</button>,
          getProps: () => ({}),
        }],
      },
    }
  ],
};
