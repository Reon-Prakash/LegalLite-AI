import React from 'react';

export default function RedFlags({ flags }) {
  return (
    <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 space-y-3">
      <h3 className="text-sm font-bold text-red-500 uppercase tracking-wider">⚠️ Red Flags</h3>
      <ul className="space-y-2">
        {flags.map((flag, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-red-800">
            <span className="mt-0.5 text-red-500 font-bold">•</span>
            <span>{flag}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
