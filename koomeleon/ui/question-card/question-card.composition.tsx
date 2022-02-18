import React from 'react';
import { QuestionCard } from './question-card';
import { styles } from './demo-styles.js';

export const BasicQuestionCard = () => (
  <QuestionCard title="Second Charge"></QuestionCard>
);

export const BasicQuestionCardWithProps = () => (
  <QuestionCard
    sectionTitle="Origination"
    title="Second Charge"
    question="What is your annual income?"
  >
    <input style={styles.input} />
    <button style={styles.button}>Next</button>
  </QuestionCard>
);
