import { ErrorMessage } from '@koodoo/koomeleon.ui.error-message';
import React, { useState } from 'react';
import styled from 'styled-components';
export type SummaryCardProps = {
	/**
   * a title to be rendered in above the input in edit mode and 
	 * above the value when not in edit mode.
   */
	title: string;
	/**
   * your form components go here.
   */
	children: React.ReactChild;
	/**
	 * value that has been typed or selected by the child component.
	 */
	value: string | number;
	/**
	 * Displays an error message if the SummaryCard is closed and error message has a length.
	 */
	errorMessage?: string | null;
};

const SummaryCardContainer = styled.div`
	background-color: ${({ theme }) => theme?.colors?.background?.summaryCard || '#FFFFFF'};
	border: ${({ theme }) =>
		theme?.colors?.background?.summaryCard ? `1px solid ${theme?.colors?.background?.summaryCard}` : 'none'};
	border-radius: 6px;
	display: grid;
	grid-template-areas: 'title button' 'value value' 'children children';
	padding: 16px;
	width: 100%;
`;

const Button = styled.button`
	background-color: transparent;
	border: none;
	color: #495ce9;
	cursor: pointer;
	float: right;
	font-size: 16px;
	font-weight: 600;
	grid-area: button;
	justify-self: self-end;
	outline: none;
`;

const Children = styled.div`grid-area: children;`;

const Title = styled.div`
	color: #5f6c8f;
	font-size: 12px;
	grid-area: title;
	float: left;
`;

const Value = styled.div`grid-area: value;`;

/**
 * @summary
 * A card for summarising values given in a form and offering ability to edit content.
 * 
 * @description 
 * To be used with koodoo form components.
 * The `errorMessage` prop is only displayed when the SummaryCard is closed. 
 * Errors when SummaryCard is open are not handled and are dependent on 
 * what is passed in as children.
 * 
 * Basic usage:
 * ```jsx
 *  <SummaryCard title="Title" value="Value" 
 *    errorMessage={error}>
 *    <Input errorMessage={error}/>
 *  </SummaryCard>
 * ```
 * [Read docs for more.](https://bit.dev/tommoore96/bit-spike/ui/summary-card)
 */
export const SummaryCard = ({ children, title, value, errorMessage }: SummaryCardProps) => {
	const [ open, setOpen ] = useState(false);
	return (
		<SummaryCardContainer>
			<Title>{title}</Title>
			<Button className="button" onClick={() => setOpen(!open)}>
				{open ? 'Close' : 'Edit'}
			</Button>
			<Value>{value ? value : 'Not specified'}</Value>
			{open && <Children>{children}</Children>}
			{errorMessage && !open && <ErrorMessage>{errorMessage}</ErrorMessage>}
		</SummaryCardContainer>
	);
};
