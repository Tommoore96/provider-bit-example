import React from 'react';
import styled, { css } from 'styled-components';
import {
  ComponentComposition,
  ComponentName,
  GetFontCSSForDefaultComposition,
} from '@koodoo/koomeleon.utils.font';

export type ProgressBarProps = {
  /**
   * The current bar fill percentage.
   */
  percent: number;
  /**
   * Flag to toggle the display of percentage text.
   */
  showPercent: boolean;
};

const Bar = styled.div<ProgressBarProps>`
  height: 10px;
  display: inline-flex;
  align-items: center;
  background-color: ${({ theme }) =>
    `${theme?.colors?.background?.progressBar?.barBackground}`};
  border-radius: 6px;
  width: 100%;

  ::after {
    content: '';
    height: 100%;
    background-color: ${({ theme }) =>
    `${theme?.colors?.background?.progressBar?.bar}`};
    border-radius: 6px;
    transition: 1s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${({ percent }) =>
    percent >= 0 && percent <= 100 ? `${percent}` : `0`}%;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Percent = styled.span`
  ${({ theme }) =>
    GetFontCSSForDefaultComposition(
      theme,
      ComponentName.PROGRESS_BAR,
      ComponentComposition.PRIMARY
    )}
    margin-left: 8px;
`;

export const ProgressBar = ({ showPercent, percent }: ProgressBarProps) => {
  return (
    <Container data-testid="progress-bar-container">
      <Bar
        data-testid="progress-bar"
        percent={percent}
        showPercent={showPercent}
      />
      {showPercent && (
        <Percent data-testid="progress-bar-percent">{percent}%</Percent>
      )}
    </Container>
  );
};
