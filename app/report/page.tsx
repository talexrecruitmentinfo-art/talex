'use client';

import { FormEvent, useState } from 'react';
import { toast } from 'sonner';
import { reportService } from '@/services/apiService';

interface ReportQuestion {
  id: string;
  label: string;
}

export default function ReportPage() {
  const [selectedIssue, setSelectedIssue] = useState('');
  const [details, setDetails] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  const questions: ReportQuestion[] = [
    { id: '1', label: 'Technical issue with the website' },
    { id: '2', label: 'Problem with job applications' },
    { id: '3', label: 'Payment or billing issue' },
    { id: '4', label: 'Account login or registration problem' },
    { id: '5', label: 'Profile update issue' },
    { id: '6', label: 'Other' },
  ];

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    if (!selectedIssue) {
      setFormError('Please select an issue type.');
      return;
    }

    if (!name.trim()) {
      setFormError('Please enter your name.');
      return;
    }

    if (!email.trim()) {
      setFormError('Please enter your email.');
      return;
    }

    setIsSubmitting(true);

    try {
      await reportService.generate({
        type: selectedIssue,
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
      });

      toast.success('Report submitted successfully!');
      setFormSuccess('Your report has been submitted. We will review it and get back to you.');
      setSelectedIssue('');
      setDetails('');
      setName('');
      setEmail('');
    } catch (error: unknown) {
      const message = (error as any)?.response?.data?.message || (error as any)?.message || 'Unable to submit your report right now.';
      setFormError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-8 shadow-card">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-brand-600">Report</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">Report an issue</h1>
      </div>
      <p className="text-sm leading-7 text-slate-600">Select the issue you&apos;re experiencing and we&apos;ll help resolve it.</p>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            What issue are you facing?
          </label>
          <div className="space-y-2">
            {questions.map((question) => (
              <label key={question.id} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="issue"
                  value={question.label}
                  checked={selectedIssue === question.label}
                  onChange={(e) => setSelectedIssue(e.target.value)}
                  className="text-brand-500 focus:ring-brand-500"
                  disabled={isSubmitting}
                />
                <span className="text-sm text-slate-700">{question.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-slate-700">
              Your Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              placeholder="Enter your full name"
              disabled={isSubmitting}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              placeholder="Enter your email"
              disabled={isSubmitting}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="details" className="block text-sm font-medium text-slate-700">
            Additional details (optional)
          </label>
          <textarea
            id="details"
            name="details"
            rows={4}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            placeholder="Provide more details about your issue"
            disabled={isSubmitting}
          />
        </div>

        {formError && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {formError}
          </div>
        )}

        {formSuccess && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
            {formSuccess}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Report'}
        </button>
      </form>
    </div>
  );
}