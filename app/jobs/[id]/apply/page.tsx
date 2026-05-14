'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Upload, X, CheckCircle } from 'lucide-react';
import { applicationService } from '@/services/applicationService';

export default function ApplyPage() {
  const router = useRouter();
  const params = useParams();
  const jobId = typeof params.id === 'string' ? params.id : params.id?.[0] || '';
  const { user } = useAuth();
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [passportFile, setPassportFile] = useState<File | null>(null);
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!user) {
    router.push('/login');
    return null;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: (file: File | null) => void, fileType: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error(`${fileType} must be less than 5MB`);
      return;
    }

    const allowedTypes: Record<string, string[]> = {
      cv: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      passport: ['image/jpeg', 'image/jpg', 'application/pdf'],
      coverLetter: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    };

    if (!allowedTypes[fileType]?.includes(file.type)) {
      toast.error(`Invalid file type for ${fileType}`);
      return;
    }

    setFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cvFile || !passportFile || !coverLetterFile) {
      toast.error('CV, Passport, and Cover Letter are required');
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('cv', cvFile);
      formData.append('passport', passportFile);
      formData.append('coverLetter', coverLetterFile);

      const application = await applicationService.submitApplication(jobId, formData);
      const applicationId = application?.id || application?._id || '';

      toast.success('Application submitted successfully! Proceed to payment.');
      router.push(`/payment?jobId=${jobId}&applicationId=${applicationId}`);
    } catch (error) {
      toast.error('Failed to submit application. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-100px)] bg-gradient-to-br from-slate-100 via-white to-sky-100 py-12">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-600">Job Application</p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900">Submit Your Application</h1>
          <p className="mt-2 text-slate-600">Upload your documents to apply. The application fee is KES 500.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-900">
              Curriculum Vitae (CV) <span className="text-rose-500">*</span>
            </label>
            <p className="text-xs text-slate-500">PDF, DOC, DOCX • Max 5MB</p>
            <div className="relative">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileChange(e, setCvFile, 'cv')}
                className="hidden"
                id="cv-input"
              />
              <label
                htmlFor="cv-input"
                className={`block rounded-3xl border-2 border-dashed p-8 text-center cursor-pointer transition ${
                  cvFile
                    ? 'border-emerald-300 bg-emerald-50'
                    : 'border-slate-300 bg-slate-50 hover:border-brand-400'
                }`}
              >
                {cvFile ? (
                  <div className="flex items-center justify-center gap-3">
                    <CheckCircle className="h-6 w-6 text-emerald-600" />
                    <div className="text-left">
                      <p className="text-sm font-semibold text-slate-900">{cvFile.name}</p>
                      <p className="text-xs text-slate-500">{(cvFile.size / 1024).toFixed(1)} KB</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <Upload className="h-8 w-8 text-slate-400 mb-2" />
                    <p className="text-sm font-semibold text-slate-900">Click to upload CV</p>
                    <p className="text-xs text-slate-500 mt-1">or drag and drop</p>
                  </div>
                )}
              </label>
              {cvFile && (
                <button
                  type="button"
                  onClick={() => setCvFile(null)}
                  className="absolute top-2 right-2 rounded-full p-1 bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-900">
              Passport Copy <span className="text-rose-500">*</span>
            </label>
            <p className="text-xs text-slate-500">JPEG, JPG, PDF • Max 5MB</p>
            <div className="relative">
              <input
                type="file"
                accept=".jpg,.jpeg,.pdf"
                onChange={(e) => handleFileChange(e, setPassportFile, 'passport')}
                className="hidden"
                id="passport-input"
              />
              <label
                htmlFor="passport-input"
                className={`block rounded-3xl border-2 border-dashed p-8 text-center cursor-pointer transition ${
                  passportFile
                    ? 'border-emerald-300 bg-emerald-50'
                    : 'border-slate-300 bg-slate-50 hover:border-brand-400'
                }`}
              >
                {passportFile ? (
                  <div className="flex items-center justify-center gap-3">
                    <CheckCircle className="h-6 w-6 text-emerald-600" />
                    <div className="text-left">
                      <p className="text-sm font-semibold text-slate-900">{passportFile.name}</p>
                      <p className="text-xs text-slate-500">{(passportFile.size / 1024).toFixed(1)} KB</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <Upload className="h-8 w-8 text-slate-400 mb-2" />
                    <p className="text-sm font-semibold text-slate-900">Click to upload Passport</p>
                    <p className="text-xs text-slate-500 mt-1">or drag and drop</p>
                  </div>
                )}
              </label>
              {passportFile && (
                <button
                  type="button"
                  onClick={() => setPassportFile(null)}
                  className="absolute top-2 right-2 rounded-full p-1 bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-900">
              Cover Letter <span className="text-rose-500">*</span>
            </label>
            <p className="text-xs text-slate-500">PDF, DOC, DOCX • Max 5MB</p>
            <div className="relative">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileChange(e, setCoverLetterFile, 'coverLetter')}
                className="hidden"
                id="cover-letter-input"
              />
              <label
                htmlFor="cover-letter-input"
                className={`block rounded-3xl border-2 border-dashed p-8 text-center cursor-pointer transition ${
                  coverLetterFile
                    ? 'border-emerald-300 bg-emerald-50'
                    : 'border-slate-300 bg-slate-50 hover:border-brand-400'
                }`}
              >
                {coverLetterFile ? (
                  <div className="flex items-center justify-center gap-3">
                    <CheckCircle className="h-6 w-6 text-emerald-600" />
                    <div className="text-left">
                      <p className="text-sm font-semibold text-slate-900">{coverLetterFile.name}</p>
                      <p className="text-xs text-slate-500">{(coverLetterFile.size / 1024).toFixed(1)} KB</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <Upload className="h-8 w-8 text-slate-400 mb-2" />
                    <p className="text-sm font-semibold text-slate-900">Click to upload Cover Letter</p>
                    <p className="text-xs text-slate-500 mt-1">or drag and drop</p>
                  </div>
                )}
              </label>
              {coverLetterFile && (
                <button
                  type="button"
                  onClick={() => setCoverLetterFile(null)}
                  className="absolute top-2 right-2 rounded-full p-1 bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <div className="rounded-3xl bg-blue-50 border border-blue-200 p-4">
            <p className="text-sm text-blue-900">
              <span className="font-semibold">Application Fee:</span> KES 500 will be charged when you proceed to payment.
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !cvFile || !passportFile || !coverLetterFile}
            className="w-full rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
          </button>

          <button
            type="button"
            onClick={() => router.back()}
            className="w-full text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            Back to Job
          </button>
        </form>
      </div>
    </div>
  );
}
