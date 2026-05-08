'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { supportService } from '@/services/apiService';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Support');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormError(null);
    setFormSuccess(null);

    try {
      await supportService.create({
        subject,
        category,
        message,
        priority: 'normal',
      });

      toast.success('Support request submitted successfully!');
      setFormSuccess('Your request has been sent. We will contact you shortly.');
      setName('');
      setEmail('');
      setCategory('Support');
      setSubject('');
      setMessage('');
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || 'Unable to send your request right now.';
      setFormError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-8 shadow-card">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-brand-600">Contact</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">Need help with your application?</h1>
      </div>
      <p className="text-sm leading-7 text-slate-600">Reach out for support with registration, job matching, payments, or profile completion.</p>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-3xl bg-slate-50 p-6">
          <p className="text-sm font-semibold text-slate-900">Email</p>
          <p className="mt-3 text-sm text-slate-600">talex.recruitment.info@gmail.com</p>
        </div>
        <div className="rounded-3xl bg-slate-50 p-6">
          <p className="text-sm font-semibold text-slate-900">Phone</p>
          <p className="mt-3 text-sm text-slate-600">+1 (XXX) XXX-XXXX</p>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-900">Send us a message</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                placeholder="John Doe"
                value={name}
                onChange={(event) => setName(event.target.value)}
                disabled={isSubmitting}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                placeholder="name@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                disabled={isSubmitting}
                required
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="category" className="block text-sm font-medium text-slate-700">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                disabled={isSubmitting}
              >
                <option value="Support">Support</option>
                <option value="Issue">Issue</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="subject" className="block text-sm font-medium text-slate-700">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                placeholder="Enter subject"
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                disabled={isSubmitting}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-medium text-slate-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              placeholder="Enter your message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              disabled={isSubmitting}
              required
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
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        <div className="mt-8 rounded-[32px] border border-slate-200 bg-slate-50 p-6 shadow-card">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-slate-900">Upload your resume</h2>
            <p className="mt-2 text-sm text-slate-600">
              Upload your resume separately on the dedicated resume upload page.
            </p>
          </div>
          <Link
            href="/resume-upload"
            className="inline-flex w-full items-center justify-center rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
          >
            Go to resume upload
          </Link>
        </div>
      </div>
    </div>
  );
}
