import { JourneyManager, StepDefinition } from '../..';
import { updateJourneyArtifact } from './update-journey-artefact';

describe('Journey Renderer', () => {
  describe('updateJourneyArtifact', () => {
    describe('Happy Path', () => {
      // Create our mocks
      const mockJM = {
        log: jest.fn(),
        emit: jest.fn(),
        journeyStorage: {
          currentStep: {
            stepName: 'test-step',
            screen: {
              components: [{
                artefactName: 'art-1',
                elementHasChanged: false,
              },
              {
                artefactName: 'art-2',
                elementHasChanged: false,
              },
              {
                artefactName: 'art-3',
                elementHasChanged: false,
              }],
            },
            collectables: {},
          },
        },
      };

      let updateJourneyArtifactInstance;
      beforeAll(() => {
        // create our wrapped function
        updateJourneyArtifactInstance = updateJourneyArtifact(mockJM as unknown as JourneyManager);

        // Call the result
        updateJourneyArtifactInstance('art-2', 'value');
      });

      test('Only Collectable for changed Component has new value', () => {
        expect(mockJM.journeyStorage.currentStep.collectables['art-1']).toBeUndefined();
        expect(mockJM.journeyStorage.currentStep.collectables['art-2']).toBe('value');
        expect(mockJM.journeyStorage.currentStep.collectables['art-3']).toBeUndefined();
      });

      test('Only changed Component has been set as changed', () => {
        expect(mockJM.journeyStorage.currentStep.screen.components[0].elementHasChanged).toBe(false);
        expect(mockJM.journeyStorage.currentStep.screen.components[1].elementHasChanged).toBe(true);
        expect(mockJM.journeyStorage.currentStep.screen.components[2].elementHasChanged).toBe(false);
      });

      test('Emit should be called with values', () => {
        expect(mockJM.emit).toHaveBeenCalledWith('artifact_update', {
          thisStepsCollectable: mockJM.journeyStorage.currentStep.collectables,
          stepName: mockJM.journeyStorage.currentStep.stepName,
          artefactName: 'art-2',
          artifactValue: 'value',
        });
      });
    });
  });
});
