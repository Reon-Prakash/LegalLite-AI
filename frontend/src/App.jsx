import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import ProcessingPage from './pages/ProcessingPage';
import ResultsPage from './pages/ResultsPage';
import Footer from './components/Footer';
import { analyzeContract } from './services/api';

export default function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);

    try {
      const analysis = await analyzeContract(file);
      setResult(analysis);
    } catch (err) {
      const message = err?.response?.data?.detail || 'Analysis failed. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
    setError(null);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">

        <header className="text-center mb-12">
          <h1 className="text-5xl font-black text-indigo-900 mb-3">⚖️ LegalLite AI</h1>
          <p className="text-gray-500 text-lg">Understand what you are signing — in seconds.</p>
        </header>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl text-sm font-medium">
            ❌ {error}
          </div>
        )}

        {!loading && !result && (
          <LandingPage
            onFileSelect={handleFileSelect}
            onAnalyze={handleAnalyze}
            file={file}
            loading={loading}
          />
        )}

        {loading && <ProcessingPage />}

        {result && !loading && (
          <ResultsPage result={result} onReset={handleReset} />
        )}

        <Footer />
      </div>
    </div>
  );
}
