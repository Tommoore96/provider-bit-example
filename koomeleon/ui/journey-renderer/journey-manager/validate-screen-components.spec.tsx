import { JourneyManager, JourneyStorage, ScreenComponent, StepDefinition } from '..';
import { validateScreenComponents } from './validate-screen-components';

describe('Journey Renderer', () => {
  describe('validateScreenComponents', () => {
    describe('Happy Path', () => {
      describe('Run each Components validation function, if it has one, and return all invalid components', () => {
        const renderContext = 'a-context';
        const mockComponentsToValidate = [{
          artefactName: 'art-1', validation: jest.fn(), elementHasChanged: false, elementIsValid: true,
        },
        {
          artefactName: 'art-2', validation: jest.fn(), elementHasChanged: false, elementIsValid: true,
        },
        {
          artefactName: 'art-3', validation: jest.fn(), elementHasChanged: false, elementIsValid: true,
        }];
        const mockStepCollection = {
          'art-1': 'value-1',
          'art-2': 'value-2',
          'art-3': 'value-3',
        };
        const mockJourneyStorage = {};

        let resultStep;
        beforeAll(() => {
          // setup mocks
          mockComponentsToValidate[0].validation.mockReturnValueOnce(false);
          mockComponentsToValidate[1].validation.mockReturnValueOnce(true);
          mockComponentsToValidate[2].validation.mockReturnValueOnce(false);

          // Call the function
          resultStep = validateScreenComponents(renderContext, mockComponentsToValidate as unknown as Array<ScreenComponent>, mockStepCollection, mockJourneyStorage as unknown as JourneyStorage);
        });

        test('Returns the invalid mock component as invalid', () => {
          expect(resultStep).toEqual([mockComponentsToValidate[0], mockComponentsToValidate[2]]);
        });

        test('Calls validation function with correct data', () => {
          expect(mockComponentsToValidate[0].validation).toHaveBeenLastCalledWith({
            renderContext,
            elementHasChanged: mockComponentsToValidate[0].elementHasChanged,
            elementArtefact: 'value-1',
            stepCollection: mockStepCollection,
            journeyStorage: mockJourneyStorage,
          });
        });
      });
    });
  });
});
