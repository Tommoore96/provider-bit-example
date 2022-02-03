import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { SummaryCard } from '.';

const mockUseTheme = {
	assets: {
		icons: {
			error: () => <div data-testid="error-icon">Mocked Icon</div>,
		},
	},
};

// jest.mock('styled-components', () => {
// 	const originalModule = jest.requireActual('styled-components');
// 	return {
// 		__esModule: true,
// 		...originalModule,
// 		useTheme: () => mockUseTheme,
// 	};
// });

const queryButton = (name: RegExp | string) => screen.queryByRole('button', { name });

describe('SummaryCard', () => {
	test('displays a title, value and children when open', () => {
		render(
			<SummaryCard title="Summary title" value="Summary value">
				<input placeholder="value" />
			</SummaryCard>
		);

		fireEvent.click(queryButton(/edit/i));

		const title = screen.getByText(/summary title/i);
		const value = screen.getByText(/summary value/i);
		const children = screen.getByPlaceholderText(/value/i);

		expect(title).toBeVisible();
		expect(value).toBeVisible();
		expect(children).toBeVisible();
	});

	test('displays a title, value but not children when closed', () => {
		render(
			<SummaryCard title="Summary title" value="Summary value" errorMessage="Error message">
				<input placeholder="value" />
			</SummaryCard>
		);
		const title = screen.getByText(/summary title/i);
		const value = screen.getByText(/summary value/i);
		const children = screen.queryByPlaceholderText(/value/i);

		expect(title).toBeVisible();
		expect(value).toBeVisible();
		expect(children).toBeFalsy();
	});

	describe('button', () => {
		test('toggles button text on click', () => {
			render(
				<SummaryCard title="Summary title" value="Summary value">
					<input placeholder="value" />
				</SummaryCard>
			);

			fireEvent.click(queryButton(/edit/i));

			expect(queryButton(/edit/i)).toBeFalsy();
			expect(queryButton(/close/i)).toBeVisible();

			fireEvent.click(queryButton(/close/i));

			expect(queryButton(/close/i)).toBeFalsy();
			expect(queryButton(/edit/i)).toBeTruthy();
		});
	});

	describe('error message', () => {
		test('is not displayed when SummaryCard is closed and errorMessage prop is an empty string', () => {
			render(
				<SummaryCard title="Summary title" value="Summary value" errorMessage="">
					<input placeholder="value" />
				</SummaryCard>
			);
			const error = screen.queryByText(/error message/i);
			expect(error).toBeFalsy();
		});

		test('is not displayed when SummaryCard is open passed an error message prop', () => {
			render(
				<SummaryCard title="Summary title" value="Summary value" errorMessage="Error message">
					<input placeholder="value" />
				</SummaryCard>
			);

			fireEvent.click(queryButton(/edit/i));

			const error = screen.queryByText(/error message/i);
			expect(error).toBeFalsy();
		});

		test('is displayed when passed an error message prop and SummaryCard is closed ', () => {
			render(
				<SummaryCard title="Summary title" value="Summary value" errorMessage="Error message">
					<input placeholder="value" />
				</SummaryCard>
			);

			const error = screen.queryByText(/error message/i);
			expect(error).toBeTruthy();
		});
	});
});
