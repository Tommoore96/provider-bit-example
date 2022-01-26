import React from 'react';
import styled from 'styled-components';

export type TextProps = {
  /**
   * a text to be rendered in the component.
   */
  text: string;
} & React.HTMLAttributes<HTMLParagraphElement>;

const StyledText = styled.div`
  background-color: ${({ theme }) => {
    console.log("🚀 ~ file: text.tsx ~ line 14 ~ theme", theme)
    return theme.backgroundColour
  }};
  color: ${({ theme }) => theme.textColour};
`

export const Text = ({ text, ...props }) => (
  <StyledText {...props}>{text}</StyledText>
)