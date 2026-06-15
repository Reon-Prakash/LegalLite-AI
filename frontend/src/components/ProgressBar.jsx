import React, { useEffect, useState } from "react";

const steps = [
  { label: "Validating file security..." },
  { label: "Extracting contract text..." },
  { label: "Analyzing clauses with AI..." },
  { label: "Generating risk assessment..." },
  { label: "Preparing your report..." },
];

export default function ProgressBar() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let stepIndex = 0;
    let progressValue = 0;

    const interval = setInterval(() => {
      progressValue += 2;
      setProgress(Math.min(progressValue, 95));

      const stepThreshold = ((stepIndex + 1) / steps.length) * 100;
      if (progressValue >= stepThreshold && stepIndex < steps.length - 1) {
        stepIndex++;
        setCurrentStep(stepIndex);
      }

      if (progressValue >= 95) clearInterval(interval);
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center space-y-6">
      <div className="text-4xl animate-pulse">⚖️</div>
      <h2 className="text-xl font-bold text-indigo-900">Analyzing your contract...</h2>

      <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
        <div
          className="bg-indigo-600 h-3 rounded-full transition-all duration-200"
          style={{ width: progress + "%" }}
        />
      </div>

      <p className="text-sm text-gray-500 font-medium">{steps[currentStep].label}</p>

      <div className="text-left space-y-2">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-3 text-sm">
            <span>{i < currentStep ? "✅" : i === currentStep ? "⏳" : "🔲"}</span>
            <span className={i <= currentStep ? "text-gray-800 font-medium" : "text-gray-400"}>
              {step.label}
            </span>
          </div>
        ))}
      </div>

      <p className="text-xs text-indigo-400">🔒 Processed in memory only — never stored</p>
    </div>
  );
}