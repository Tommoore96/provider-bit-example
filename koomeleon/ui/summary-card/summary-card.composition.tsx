import React from 'react';
import { SummaryCard } from './summary-card';

export const BasicSummaryCard = () => (
	<SummaryCard title="Summary label" value="Summary value">
		<input placeholder="value" />
	</SummaryCard>
);
