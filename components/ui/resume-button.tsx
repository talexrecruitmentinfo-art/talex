'use client';

import React from 'react';

interface ResumeButtonProps {
  resumeUrl?: string | null;
  className?: string;
  variant?: 'default' | 'outline' | 'success';
}

export const ResumeButton: React.FC<ResumeButtonProps> = ({
  resumeUrl,
  className = '',
  variant = 'default',
}) => {
  if (!resumeUrl) {
    return <p className="text-sm text-slate-500">No resume uploaded</p>;
  }

  // Force download from Cloudinary
  const forceDownloadUrl = resumeUrl.includes('/upload/')
    ? resumeUrl.replace('/upload/', '/upload/fl_attachment/')
    : resumeUrl;

  const variantClasses = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50',
    success: 'bg-green-600 text-white hover:bg-green-700',
  };

  return (
    <a
      href={forceDownloadUrl}
      target="_blank"
      rel="noopener noreferrer"
      download
      className={`inline-block px-4 py-2 rounded font-medium transition-colors ${variantClasses[variant]} ${className}`}
    >
      📥 Download Resume
    </a>
  );
};

export default ResumeButton;
