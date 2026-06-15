import React, { useState } from "react";

export default function ClauseCard({ clause }) {
  const [expanded, setExpanded] = useState(false);

  const getRiskStyle = () => {
    if (clause.risk === "High") return "bg-red-50 border text-red-700";
    if (clause.risk === "Medium") return "bg-amber-50 border text-amber-700";
    return "bg-green-50 border text-green-700";
  };

  const getRiskEmoji = () => {
    if (clause.risk === "High") return "🔴";
    if (clause.risk === "Medium") return "🟡";
    return "🟢";
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition"
      >
        <div className="flex items-center gap-3">
          <span>{getRiskEmoji()}</span>
          <span className="font-semibold text-gray-800">{clause.title}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className={"text-xs font-bold px-2 py-1 rounded-full " + getRiskStyle()}>
            {clause.risk} Risk
          </span>
          <span className="text-gray-400">{expanded ? "▲" : "▼"}</span>
        </div>
      </button>

      {expanded && (
        <div className="px-5 pb-5 space-y-3 border-t border-gray-100 pt-4">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">Plain English</p>
            <p className="text-gray-700 text-sm">{clause.plain_english}</p>
          </div>
          <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3">
            <p className="text-xs font-bold text-indigo-500 uppercase mb-1">💡 Tip</p>
            <p className="text-indigo-800 text-sm">{clause.tip}</p>
          </div>
        </div>
      )}
    </div>
  );
}