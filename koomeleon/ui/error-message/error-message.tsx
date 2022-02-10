import { ComponentComposition, ComponentName, GetFontCSSForDefaultComposition } from '@koodoo/koomeleon.utils.font';
import React from 'react';
import styled, { useTheme } from 'styled-components';

export type ErrorMessageProps = {
	/** Message to be displayed. */
	children: string;
};

const StyledErrorMessage = styled.span`
${({ theme }) => GetFontCSSForDefaultComposition(theme, ComponentName.ERROR_MESSAGE, ComponentComposition.PRIMARY)}
  display: flex;
  padding: 8px 0;
  > svg {
    padding-right: 8px;
  }
`;

export const ErrorMessage = ({ children }: ErrorMessageProps) => {
	const theme = useTheme();
	const Icon = theme.assets?.icons?.error
	return (
		<StyledErrorMessage>
			{Icon && <Icon />}
			{children}
		</StyledErrorMessage>
	)
};
