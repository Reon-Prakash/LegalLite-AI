import React, { useRef, useState } from "react";

export default function UploadButton({ onFileSelect, onAnalyze, file, loading }) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) onFileSelect(droppedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const baseClass = "cursor-pointer border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-200";
  const dragClass = dragOver
    ? "border-indigo-500 bg-indigo-50"
    : "border-gray-300 bg-white hover:border-indigo-400 hover:bg-indigo-50";

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      <div
        onClick={() => inputRef.current.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={baseClass + " " + dragClass}
      >
        <div className="text-5xl mb-4">📄</div>
        <p className="text-gray-600 font-medium">
          {file ? file.name : "Drag and drop your contract here"}
        </p>
        <p className="text-gray-400 text-sm mt-1">
          {file ? "File ready for analysis" : "or click to browse — PDF or DOCX only"}
        </p>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx"
          className="hidden"
          onChange={(e) => onFileSelect(e.target.files[0])}
        />
      </div>

      {file && (
        <button
          onClick={onAnalyze}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-bold py-4 rounded-xl transition-all duration-200 text-lg shadow-md"
        >
          {loading ? "Analyzing..." : "Analyze Contract"}
        </button>
      )}
    </div>
  );
}