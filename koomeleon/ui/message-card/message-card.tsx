import React from 'react';
import styled, { css, useTheme } from 'styled-components';

export type MessageCardProps = {
	/**
	 * Message to be displayed
	 */
	children: string;
	/**
	 * Icon will be displayed next to title if passed in
	 */
	icon?: React.ReactElement<SVGElement>;
	/**
	 * Title of the message
	 */
	title: string;
};

type MessageCardContainerProps = {
	hasIcon: boolean;
};

type TitleProps = {
	children: string;
};

type MessageProps = {
	children: string;
};

export const MessageCardContainer = styled.div<MessageCardContainerProps>`
  background: ${({ theme }) =>
		theme?.colors?.background?.messageCard || '#FFFFFF'};
  border-radius: 6px;
  box-shadow: 0px 0px 0px 1px
    ${({ theme }) => theme?.colors?.border?.messageCard || '#e2e5ed'};
  color: ${({ theme }) => theme?.colors?.text?.messageCard || '#000000'};
  padding: 16px;
  column-gap: 8px;
  row-gap: 8px;

  ${({ hasIcon }) =>
		hasIcon
			? css`
          display: grid;
          grid-template-columns: 24px auto;
          grid-template-rows: auto;
          grid-template-areas: 'svg-block title' 'empty message';
        `
			: css`
          display: flex;
          flex-direction: column;
        `}
`;

const IconSection = styled.span`
  > svg {
    grid-column-start: auto;
    grid-area: svg-block;
    height: 24px;
    padding-top: 4px;
    width: 24px;
  }
`;

const Message = styled.p<MessageProps>`
  align-self: stretch;
  flex: none;
  flex-grow: 0;
  font-size: 16px;
  grid-area: message;
  margin: 0;
`;

const Title = styled.span<TitleProps>`
  font-weight: 600;
  font-size: 18px;
  margin: 0;
  grid-area: title;
`;

export const MessageCard = ({ children, icon, title }: MessageCardProps) => {
	const theme = useTheme();
	const Icon = theme?.assets?.icons?.messageCard;
	return (
		<MessageCardContainer hasIcon={!!icon} data-testid="message-card-container">
			{Icon && (
				<IconSection>
					<Icon />
				</IconSection>
			)}
			<Title>{title}</Title>
			<Message>{children}</Message>
		</MessageCardContainer>
	);
};
