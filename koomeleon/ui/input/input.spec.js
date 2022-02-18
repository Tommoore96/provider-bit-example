import { ThemeProvider } from '@koodoo/koomeleon.ui.theme-provider';
import { render, screen } from '@testing-library/react';
import 'jest-styled-components';
import React from 'react';
import { Input } from './input';

const mockUseTheme = {
  assets: {
    icons: {
      error: () => <div data-testid="error-icon">Mocked Icon</div>,
    },
  },
};

jest.mock('styled-components', () => {
  const originalModule = jest.requireActual('styled-components');
  return {
    __esModule: true,
    ...originalModule,
    useTheme: () => mockUseTheme,
  };
});

test('render an input component', () => {
	render(
		<ThemeProvider theme={'koodooTheme'}>
			<Input placeholder="Name" />
		</ThemeProvider>
	);
	expect(screen.getByPlaceholderText('Name')).toBeVisible();
});

test('display an error message and has a red box shadow when invalid', () => {
	render(
		<ThemeProvider theme={'koodooTheme'}>
			<Input errorMessage="Whoops" placeholder="Name" />
		</ThemeProvider>
	);

	expect(screen.getByPlaceholderText('Name').closest('div')).toHaveStyleRule(
		'box-shadow',
		'0px 0px 0px 2px #FF1F48 inset'
	);
	expect(screen.getByText('Whoops')).toBeVisible();
});

test('do not display a red box shadow when valid', () => {
	render(
		<ThemeProvider theme={'koodooTheme'}>
			<Input errorMessage="" placeholder="Name" />
		</ThemeProvider>
	);

	expect(screen.getByPlaceholderText('Name').closest('div')).not.toHaveStyleRule(
		'box-shadow',
		'0px 0px 0px 2px #FF1F48 inset'
	);
});

test("doesn't display an error message when valid", () => {
	render(
		<ThemeProvider theme={'koodooTheme'}>
			<Input errorMessage="" />
		</ThemeProvider>
	);
	expect(screen.queryByText('Whoops')).toBeFalsy();
});

test('display a prefix and suffix', () => {
	render(
		<ThemeProvider theme={'koodooTheme'}>
			<Input prefix="foo" suffix="bar" />
		</ThemeProvider>
	);
	expect(screen.queryByText('foo')).toBeVisible();
	expect(screen.queryByText('bar')).toBeVisible();
});
