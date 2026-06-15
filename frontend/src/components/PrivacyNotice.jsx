import React from 'react';

export default function PrivacyNotice() {
  return (
    <div className="flex items-center justify-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm px-5 py-3 rounded-xl max-w-xl mx-auto">
      <span className="text-lg">🔒</span>
      <p>
        Your document is processed <strong>in memory only</strong> and destroyed
        instantly after analysis. We never store, log, or retain your files.
      </p>
    </div>
  );
}
