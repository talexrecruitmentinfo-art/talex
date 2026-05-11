'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ApplyPage() {
  const router = useRouter();
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [passportFile, setPassportFile] = useState<File | null>(null);
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!cvFile) {
      setError('Please upload your CV before continuing.');
      return;
    }

    if (!passportFile) {
      setError('Please upload your passport page before continuing.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate file upload and validation prior to payment.
      const applicationFiles = {
        cv: cvFile,
        passport: passportFile,
        coverLetter: coverLetterFile,
      };
      console.log('Uploading files', applicationFiles);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push('/payment?amount=500');
    } catch (uploadError) {
      console.error(uploadError);
      setError('Unable to process your files right now. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 xl:grid-cols-[0.9fr_0.8fr]">
          <section className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-card">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.25em] text-brand-600">Start your application</p>
              <h1 className="text-4xl font-semibold text-slate-900">Upload your documents to continue</h1>
              <p className="max-w-2xl text-base leading-7 text-slate-600">
                Complete your application by submitting your CV and passport page. You can also attach a cover letter if you want to highlight your experience.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-10 space-y-8">
              <div className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-xl font-semibold text-slate-900">Required documents</h2>
                <p className="text-sm text-slate-600">Upload your files securely. Accepted formats: PDF, DOC, DOCX, JPG, PNG.</p>

                <div className="space-y-6">
                  <label className="block text-sm font-medium text-slate-900">
                    Curriculum Vitae (CV)
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={(event) => setCvFile(event.target.files?.[0] || null)}
                      className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 ring-brand-500/10 focus:border-brand-500 focus:outline-none focus:ring"
                    />
                  </label>

                  <label className="block text-sm font-medium text-slate-900">
                    Passport page
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(event) => setPassportFile(event.target.files?.[0] || null)}
                      className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 ring-brand-500/10 focus:border-brand-500 focus:outline-none focus:ring"
                    />
                  </label>

                  <label className="block text-sm font-medium text-slate-900">
                    Cover letter (optional)
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={(event) => setCoverLetterFile(event.target.files?.[0] || null)}
                      className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 ring-brand-500/10 focus:border-brand-500 focus:outline-none focus:ring"
                    />
                  </label>
                </div>
              </div>

              {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-[1fr_auto] items-center">
                <div>
                  <p className="text-sm text-slate-600">After uploading, you will be redirected to a secure payment page to complete the KES 500 application fee.</p>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center rounded-full bg-brand-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-brand-500/10 transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? 'Uploading...' : 'Continue to Payment'}
                </button>
              </div>
            </form>
          </section>

          <aside className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-8 shadow-card">
            <div className="rounded-3xl bg-brand-50 p-6">
              <p className="text-sm uppercase tracking-[0.25em] text-brand-600">Application fee</p>
              <p className="mt-3 text-4xl font-semibold text-slate-900">KES 500</p>
              <p className="mt-3 text-sm text-slate-600">A secure fee for processing your visa-sponsored job application.</p>
            </div>

            <div className="rounded-3xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900">What we need</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li>CV / Resume</li>
                <li>Passport biodata page</li>
                <li>Cover letter (optional)</li>
                <li>Fast review and payment redirect</li>
              </ul>
            </div>

            <div className="rounded-3xl bg-slate-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Need help?</p>
              <p className="mt-3 text-sm text-slate-600">If you have questions about your documents or the application process, our support team can assist.</p>
              <Link href="/contact" className="mt-4 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition">
                Contact Support
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
