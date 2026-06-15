import React from 'react';
import PrivacyNotice from '../components/PrivacyNotice';
import UploadButton from '../components/UploadButton';

export default function LandingPage({ onFileSelect, onAnalyze, file, loading }) {
  return (
    <div className="space-y-8">
      <PrivacyNotice />
      <UploadButton
        onFileSelect={onFileSelect}
        onAnalyze={onAnalyze}
        file={file}
        loading={loading}
      />
    </div>
  );
}
