import {
  ComponentDefinition, ScreenComponent, Step, StepDefinition,
} from '..';
import { enrichSteps, enrichComponent, populateCollectables } from './enrich-steps';

describe('Journey Renderer', () => {
  describe('enrichSteps', () => {
    describe('Happy Path', () => {
      describe('Given the minimum step definition, appropriately transform into steps', () => {
        let resultSteps: Array<Step>;
        const enrichComponentsMock = jest.fn();
        const populateCollectablesMock = jest.fn();
        const populateCollectablesInstanceMock = jest.fn();

        const initialState = {};

        beforeAll(() => {
          // Create fake data
          const stepsDef: Array<StepDefinition> = [
            {
              stepName: 'step-1',
              screen: {
                screenName: 'welcome-screen',
                components: [{
                  Element: {} as unknown as React.FC,
                  getProps: () => ({}),
                }, {
                  Element: {} as unknown as React.FC,
                  getProps: () => ({}),
                }],
              },
            },
          ];

          // Setup Mocks -- We don't need it to do anything
          // Just need to know it was called really
          // It's functionality is tested elsewhere in this file
          enrichComponentsMock.mockReturnValue({});
          populateCollectablesInstanceMock.mockReturnValue({});
          populateCollectablesMock.mockReturnValue(populateCollectablesInstanceMock);

          const dependencies = {
            enrichComponent: enrichComponentsMock,
            populateCollectables: populateCollectablesMock,
          };

          // Call the function
          resultSteps = enrichSteps(stepsDef, initialState, dependencies);
        });

        test('Returns the same number of steps as it was given', () => {
          expect(resultSteps.length).toEqual(1);
        });

        test('Calls the enrichComponent as many times as components given', () => {
          expect(enrichComponentsMock).toBeCalledTimes(2);
        });

        test('Returns the same number of components as it was given', () => {
          expect(resultSteps[0].screen.components.length).toBe(2);
        });

        test('Calls the populateCollectables with the initial state', () => {
          expect(populateCollectablesMock).toBeCalledWith(initialState);
        });

        test('Calls the populateCollectablesInstance as many times as components given', () => {
          expect(populateCollectablesInstanceMock).toBeCalledTimes(2);
        });

        test('Returns Step with continueProgress false as there is no initial state', () => {
          expect(resultSteps[0].continueProgress).toBe(false);
        });

        test('Returns Step with allElementsAreValid false', () => {
          expect(resultSteps[0].allElementsAreValid).toBe(false);
        });
      });

      describe('Given a step definition with a progressed initialState, returns initialState', () => {
        let resultSteps: Array<Step>;
        const enrichComponentsMock = jest.fn();
        const populateCollectablesMock = jest.fn();
        const populateCollectablesInstanceMock = jest.fn();

        const initialState = {
          'step-1': {
            progressed: true,
          },
        };

        beforeAll(() => {
          // Create fake data
          const stepsDef: Array<StepDefinition> = [
            {
              stepName: 'step-1',
              screen: {
                screenName: 'welcome-screen',
                components: [{
                  Element: {} as unknown as React.FC,
                  getProps: () => ({}),
                }, {
                  Element: {} as unknown as React.FC,
                  getProps: () => ({}),
                }],
              },
            },
          ];

          // Setup Mocks -- We don't need it to do anything
          // Just need to know it was called really
          // It's functionality is tested elsewhere in this file
          enrichComponentsMock.mockReturnValue({});
          populateCollectablesInstanceMock.mockReturnValue({});
          populateCollectablesMock.mockReturnValue(populateCollectablesInstanceMock);

          const dependencies = {
            enrichComponent: enrichComponentsMock,
            populateCollectables: populateCollectablesMock,
          };

          // Call the function
          resultSteps = enrichSteps(stepsDef, initialState, dependencies);
        });

        test('Returns Step with continueProgress true as there is initial state with it true', () => {
          expect(resultSteps[0].continueProgress).toBe(true);
        });
      });
    });
  });

  describe('enrichComponent', () => {
    describe('Happy Path', () => {
      describe('Given a component definition without validation, appropriately transform into component', () => {
        let enrichedComponent: ScreenComponent;

        beforeAll(() => {
          const componentDef: ComponentDefinition = {
            Element: {} as unknown as React.FC,
            getProps: () => ({}),
          };

          // Call the function
          enrichedComponent = enrichComponent(componentDef);
        });

        test('Component elementIsValid is true as it does not have a validation function', () => {
          expect(enrichedComponent.elementIsValid).toBe(true);
        });

        test('Component elementHasChanged is false', () => {
          expect(enrichedComponent.elementHasChanged).toBe(false);
        });
      });

      describe('Given a component definition validation, appropriately transform into component', () => {
        let enrichedComponent: ScreenComponent;

        beforeAll(() => {
          const componentDef: ComponentDefinition = {
            Element: {} as unknown as React.FC,
            validation: () => true,
            getProps: () => ({}),
          };

          // Call the function
          enrichedComponent = enrichComponent(componentDef);
        });

        test('Component elementIsValid is false as it does have a validation function', () => {
          expect(enrichedComponent.elementIsValid).toBe(false);
        });
      });
    });
  });

  describe('populateCollectables', () => {
    describe('Happy Path', () => {
      describe('Given a component definition validation, appropriately transform into component', () => {
        let populateCollectablesInstance;

        beforeAll(() => {
          const initialState = {
            collectables: {
              'art-1': 'value',
            },
          };

          // Call the function
          populateCollectablesInstance = populateCollectables(initialState);
        });

        test('Given a component with an artifact that has initialState', () => {
          const componentDef: ScreenComponent = {
            Element: {} as unknown as React.FC,
            validation: () => true,
            getProps: () => ({}),
            elementIsValid: false,
            elementHasChanged: false,
            artefactName: 'art-1',
          };

          expect(populateCollectablesInstance({}, componentDef)).toEqual({
            'art-1': 'value',
          });
        });

        test('Given a component with an artifact that has no initialState', () => {
          const componentDef: ScreenComponent = {
            Element: {} as unknown as React.FC,
            validation: () => true,
            getProps: () => ({}),
            elementIsValid: false,
            elementHasChanged: false,
            artefactName: 'art-2',
          };

          expect(populateCollectablesInstance({}, componentDef)).toEqual({});
        });

        test('Given a component with no artifact but initialState exists', () => {
          const componentDef: ScreenComponent = {
            Element: {} as unknown as React.FC,
            validation: () => true,
            getProps: () => ({}),
            elementIsValid: false,
            elementHasChanged: false,
          };

          expect(populateCollectablesInstance({}, componentDef)).toEqual({});
        });

        test('Given a component with an artifact that has initialState, and an object that already has state', () => {
          const componentDef: ScreenComponent = {
            Element: {} as unknown as React.FC,
            validation: () => true,
            getProps: () => ({}),
            elementIsValid: false,
            elementHasChanged: false,
            artefactName: 'art-1',
          };

          expect(populateCollectablesInstance({ 'art-2': 'value' }, componentDef)).toEqual({
            'art-2': 'value',
            'art-1': 'value',
          });
        });
      });
    });
  });
});
