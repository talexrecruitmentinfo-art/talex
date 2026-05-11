'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Copy, Download } from 'lucide-react';
import { useState } from 'react';

export default function ApplicationSuccessPage() {
  const searchParams = useSearchParams();
  const trackingNumber = searchParams.get('tracking') || 'TALEX' + Math.random().toString(36).substr(2, 9).toUpperCase();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(trackingNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-lg w-full space-y-8">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-green-200/50 blur-xl rounded-full"></div>
            <CheckCircle className="h-24 w-24 text-green-600 relative" />
          </div>
        </div>

        {/* Message */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-900">Application Submitted Successfully!</h1>
          <p className="text-lg text-slate-600">
            Your application has been received and payment confirmed. Track your progress below.
          </p>
        </div>

        {/* Tracking Number Card */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-lg p-6">
          <p className="text-sm font-medium text-slate-600 mb-2">Your Tracking Number</p>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={trackingNumber}
              readOnly
              className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 font-mono text-lg font-semibold text-slate-900"
            />
            <button
              onClick={copyToClipboard}
              className="inline-flex items-center justify-center rounded-lg bg-brand-500 px-4 py-3 text-white hover:bg-brand-600 transition"
            >
              <Copy className="h-5 w-5" />
            </button>
          </div>
          {copied && (
            <p className="mt-2 text-sm text-green-600 font-medium">✓ Copied to clipboard</p>
          )}
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-lg p-6">
          <h2 className="font-semibold text-slate-900 mb-4">What Happens Next?</h2>
          <div className="space-y-3">
            {[
              { step: 1, title: 'Application Review', desc: 'Our team will review your application within 48 hours' },
              { step: 2, title: 'Status Updates', desc: 'You\'ll receive email and SMS notifications about your status' },
              { step: 3, title: 'Interview', desc: 'Selected candidates will be invited for a video interview' },
              { step: 4, title: 'Offer Letter', desc: 'Approved candidates will receive the offer letter' },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-brand-100 text-brand-600 font-semibold">
                  {item.step}
                </div>
                <div>
                  <p className="font-medium text-slate-900">{item.title}</p>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            href="/dashboard/applications"
            className="w-full inline-flex items-center justify-center rounded-lg bg-brand-500 px-6 py-3 font-semibold text-white hover:bg-brand-600 transition"
          >
            View My Applications
          </Link>
          <Link
            href="/dashboard"
            className="w-full inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/jobs"
            className="w-full inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            Browse More Jobs
          </Link>
        </div>

        {/* Help Section */}
        <div className="bg-blue-50 rounded-xl border border-blue-200 p-6 text-center">
          <p className="text-sm text-slate-700">
            Need help? Contact our support team at{' '}
            <a href="mailto:support@talex.com" className="font-semibold text-brand-600 hover:underline">
              support@talex.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
