import React, { ReactChild } from 'react';
import styled from 'styled-components';
import { BackIcon } from './back-icon.js';

export type QuestionCardProps = {
  /**
   * any form content you desire.
   */
  children?: ReactChild | ReactChild[];
  /**
   * a section title to be rendered in the component.
   */
  sectionTitle?: string;
  /**
   * a title to be rendered in the component.
   */
  title: string;
  /**
   * the question to be asked by the component.
   */
  question?: string;
};

const QuestionCardContainer = styled.div`
  > * {
    margin: 8px 0;
  }

  > div {
    margin: 16px 0;
    > * {
      margin: 12px 0;
    }
  }

  > h1 {
    color: #5f6c8f;
    font-size: 18px;
    line-height: 120%;
  }

  > h2 {
    color: #0f0f0f;
    font-size: 26px;
    line-height: 120%;
  }

  > p {
    color: #0f0f0f;
    font-size: 18px;
    line-height: 140%;
  }
`;

const Button = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

export function QuestionCard({
  children,
  question,
  sectionTitle,
  title,
}: QuestionCardProps) {
  return (
    <QuestionCardContainer>
      <Button>
        <BackIcon />
      </Button>
      {sectionTitle && <h1>{sectionTitle}</h1>}
      <h2>{title}</h2>
      {question && <p>{question}</p>}
      {children && <div>{children}</div>}
    </QuestionCardContainer>
  );
}
