import React from 'react';
import { render, screen } from '@testing-library/react';
import 'jest-styled-components';
// import * as StyledComponents from 'styled-components';
import { MessageCard } from './message-card';
import { Icon } from './message-card.composition';

const mockUseTheme = {
  assets: {
    icons: {
      messageCard: () => <div data-testid="icon">Mocked Icon</div>,
    },
  },
};

describe('MessageCard with icon', () => {

  beforeAll(() => {
    // @ts-ignore
    // jest.spyOn(StyledComponents, 'useTheme').mockImplementation(() => mockUseTheme);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('renders component elements', () => {
    render(
      <MessageCard icon={<Icon />} title="Message Title">
        Message
      </MessageCard>
    );

    // expect(screen.getByTestId('message-card-container')).toHaveStyleRule(
    //   'display',
    //   'grid'
    // );
    expect(screen.getByText('Message Title')).toBeTruthy();
    expect(screen.getByText('Message')).toBeTruthy();
    // expect(screen.getByTestId('icon')).toBeTruthy();
  });
})

describe('MessageCard without icon', () => {
  test('does not break if not passed icon', () => {
    render(<MessageCard title="Message Title">Message</MessageCard>);

    // expect(screen.getByTestId('message-card-container')).toHaveStyleRule(
    //   'display',
    //   'flex'
    // );
    expect(screen.getByText('Message Title')).toBeTruthy();
    expect(screen.getByText('Message')).toBeTruthy();
    // expect(screen.queryByTestId('icon')).toBeFalsy();
  });
})
