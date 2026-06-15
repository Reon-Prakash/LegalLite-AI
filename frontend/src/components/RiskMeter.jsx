import React from "react";

export default function RiskMeter({ score, level }) {
  const getColor = () => {
    if (level === "High") return "#dc2626";
    if (level === "Medium") return "#d97706";
    return "#16a34a";
  };

  const getBg = () => {
    if (level === "High") return "bg-red-50 border-red-200";
    if (level === "Medium") return "bg-amber-50 border-amber-200";
    return "bg-green-50 border-green-200";
  };

  const getEmoji = () => {
    if (level === "High") return "🔴";
    if (level === "Medium") return "🟡";
    return "🟢";
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className={"rounded-2xl border-2 p-6 text-center space-y-3 " + getBg()}>
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Risk Score</h3>

      <div className="flex justify-center">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="45" fill="none" stroke="#e5e7eb" strokeWidth="10" />
          <circle
            cx="60" cy="60" r="45"
            fill="none"
            stroke={getColor()}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
            className="transition-all duration-1000"
          />
          <text x="60" y="55" textAnchor="middle" fontSize="22" fontWeight="bold" fill={getColor()}>
            {score}
          </text>
          <text x="60" y="72" textAnchor="middle" fontSize="11" fill="#6b7280">
            out of 100
          </text>
        </svg>
      </div>

      <div className="text-2xl font-black" style={{ color: getColor() }}>
        {getEmoji()} {level} Risk
      </div>
    </div>
  );
}