import React, { useRef, useState } from "react";

export default function UploadButton({ onFileSelect, onAnalyze, file, loading }) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [sizeError, setSizeError] = useState(null);

  const MAX_SIZE_MB = 10;
  const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

  const handleFileValidation = (selectedFile) => {
    if (!selectedFile) return;

    if (selectedFile.size > MAX_SIZE_BYTES) {
      setSizeError("File is too large. Maximum allowed size is 10MB.");
      return;
    }

    const allowedExtensions = [".pdf", ".docx"];
    const fileExt = selectedFile.name.toLowerCase().slice(selectedFile.name.lastIndexOf("."));
    if (!allowedExtensions.includes(fileExt)) {
      setSizeError("Invalid file type. Only PDF and DOCX files are allowed.");
      return;
    }

    setSizeError(null);
    onFileSelect(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) handleFileValidation(droppedFile);
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

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

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
          {file
            ? "File size: " + formatSize(file.size)
            : "or click to browse"}
        </p>

        <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-400">
          <span className="bg-gray-100 px-2 py-1 rounded-full">📋 PDF</span>
          <span className="bg-gray-100 px-2 py-1 rounded-full">📝 DOCX</span>
          <span className="bg-gray-100 px-2 py-1 rounded-full">📦 Max 10MB</span>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx"
          className="hidden"
          onChange={(e) => handleFileValidation(e.target.files[0])}
        />
      </div>

      {sizeError && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
          ❌ {sizeError}
        </div>
      )}

      {file && !sizeError && (
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