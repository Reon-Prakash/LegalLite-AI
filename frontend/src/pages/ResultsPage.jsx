import React from 'react';
import RiskMeter from '../components/RiskMeter';
import RedFlags from '../components/RedFlags';
import ActionsList from '../components/ActionsList';
import ClauseList from '../components/ClauseList';
import ReUploadButton from '../components/ReUploadButton';

export default function ResultsPage({ result, onReset }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <RiskMeter score={result.risk_score} level={result.risk_level} />
        </div>
        <div className="md:col-span-2 space-y-4">
          <RedFlags flags={result.red_flags} />
          <ActionsList actions={result.top_3_actions} />
        </div>
      </div>
      <ClauseList clauses={result.clauses} />
      <ReUploadButton onReset={onReset} />
    </div>
  );
}
