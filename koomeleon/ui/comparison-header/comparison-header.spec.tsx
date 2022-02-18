import React from 'react';
import { render, screen } from '@testing-library/react';
import { ComparisonHeader } from './comparison-header';

test('renders children', () => {
  render(
    <ComparisonHeader>
      <svg data-testid='customer-logo'/>
      <svg data-testid='koodoo-logo'/>
      <div data-testid='generic-div'>Generic Text</div>
    </ComparisonHeader>
  );
  expect(screen.getByTestId('customer-logo')).toBeVisible();
  expect(screen.getByTestId('koodoo-logo')).toBeVisible();
  expect(screen.getByTestId('generic-div')).toBeVisible();
});
