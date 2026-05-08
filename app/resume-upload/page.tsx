'use client';

import { ChangeEvent, useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { uploadService } from '@/services/apiService';

export default function ResumeUploadPage() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  const handleResumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setUploadSuccess(null);
    setUploadError(null);

    if (!file) {
      setResumeFile(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File must be 5MB or smaller.');
      setResumeFile(null);
      return;
    }

    if (
      file.type !== 'application/pdf' &&
      file.type !== 'application/msword' &&
      file.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      setUploadError('Only PDF, DOC, or DOCX files are allowed.');
      setResumeFile(null);
      return;
    }

    setResumeFile(file);
  };

  const handleResumeUpload = async () => {
    if (!resumeFile) {
      setUploadError('Please select a resume file first.');
      return;
    }

    setUploading(true);
    setUploadError(null);
    setUploadSuccess(null);

    try {
      const data = await uploadService.uploadResume(resumeFile);
      setUploadSuccess(data.fileUrl || 'Resume uploaded successfully.');
      toast.success('Resume uploaded successfully!');
      setResumeFile(null);
    } catch (error: any) {
      setUploadError(error?.message || 'Resume upload failed.');
      toast.error('Resume upload failed.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-8 shadow-card sm:p-10">
          <div className="space-y-3 text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-brand-600">Resume upload</p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Upload your resume</h1>
            <p className="text-sm text-slate-600">
              Submit your resume file in PDF, DOC or DOCX format. Files must be 5MB or smaller.
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="resume" className="block text-sm font-medium text-slate-700">
                Select resume
              </label>
              <input
                id="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                onChange={handleResumeChange}
              />
            </div>

            {uploadError && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {uploadError}
              </div>
            )}

            {uploadSuccess && (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
                {uploadSuccess}
              </div>
            )}

            <button
              type="button"
              onClick={handleResumeUpload}
              disabled={!resumeFile || uploading}
              className="inline-flex w-full items-center justify-center rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? 'Uploading...' : 'Upload Resume'}
            </button>
          </div>

          <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">Need to send a message instead?</p>
            <p className="mt-2">
              Use the <Link href="/contact" className="font-semibold text-brand-600 hover:text-brand-700">contact form</Link> for general inquiries.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
