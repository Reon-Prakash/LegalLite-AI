import React from 'react';

export default function ActionsList({ actions }) {
  return (
    <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 space-y-3">
      <h3 className="text-sm font-bold text-green-600 uppercase tracking-wider">📌 Top 3 Actions</h3>
      <ol className="space-y-3">
        {actions.map((action, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-green-900">
            <span className="bg-green-600 text-white font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs">
              {i + 1}
            </span>
            <span>{action}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
