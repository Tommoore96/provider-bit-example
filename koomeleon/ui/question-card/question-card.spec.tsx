import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  BasicQuestionCard,
  BasicQuestionCardWithProps,
} from './question-card.composition';

test('renders when passed only required props', () => {
  render(<BasicQuestionCard />);

  const title = screen.getByRole('heading', { name: /second charge/i });

  expect(title).toBeVisible();
});

test('renders with the correct text and passed in children', () => {
  render(<BasicQuestionCardWithProps />);

  const sectionTitle = screen.getByRole('heading', { name: /origination/i });
  const title = screen.getByRole('heading', { name: /second charge/i });
  const question = screen.getByText(/what is your annual income?/i);

  // children
  const input = screen.getByRole('textbox');
  const button = screen.getByRole('button', { name: /next/i });

  expect(sectionTitle).toBeVisible();
  expect(title).toBeVisible();
  expect(question).toBeVisible();
  expect(input).toBeVisible();
  expect(button).toBeVisible();
});
