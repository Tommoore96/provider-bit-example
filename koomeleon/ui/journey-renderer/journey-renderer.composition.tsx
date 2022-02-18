import React, { ReactElement } from 'react';
import { JourneyManager, getJourneyManager } from '.';
import { exampleJourney } from './example-data/demo-journey';
import { JourneyDisplay } from './journey-display';

export const BasicJourneyRenderer = (): ReactElement => {
  const ourJourneyManager: JourneyManager = getJourneyManager(exampleJourney);
  return <JourneyDisplay journeyManager={ourJourneyManager} />;
};
