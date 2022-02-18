import React, { useState } from 'react';
import { ProgressBar } from './progress-bar';

export const BasicProgressBar = () => {
  const [percent, setPercent] = useState(50);
  return (
    <>
      <ProgressBar percent={percent} showPercent={false} />
      <button
        onClick={() => (percent >= 100 ? setPercent(0) : setPercent(100))}
      >
        Animate
      </button>
    </>
  );
};

export const BasicProgressBarWithPercentage = () => {
  const [percent, setPercent] = useState(50);
  return (
    <>
      <ProgressBar percent={percent} showPercent={true} />
      <button
        onClick={() => (percent >= 100 ? setPercent(0) : setPercent(100))}
      >
        Animate
      </button>
    </>
  );
};
