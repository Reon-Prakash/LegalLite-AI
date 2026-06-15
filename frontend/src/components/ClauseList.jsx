import React from 'react';
import ClauseCard from './ClauseCard';

export default function ClauseList({ clauses }) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">📄 Clause-by-Clause Breakdown</h3>
      {clauses.map((clause, i) => (
        <ClauseCard key={i} clause={clause} />
      ))}
    </div>
  );
}
