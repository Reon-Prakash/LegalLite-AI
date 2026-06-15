import React from 'react';

export default function ReUploadButton({ onReset }) {
  return (
    <div className="text-center pt-4">
      <button
        onClick={onReset}
        className="bg-white border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white font-bold px-8 py-3 rounded-xl transition-all duration-200 shadow-sm"
      >
        🔄 Upload Another Contract
      </button>
    </div>
  );
}
