'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';

export default function PaymentsPage() {
  const router = useRouter();
  const [amount, setAmount] = useState('500');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const queryAmount = params.get('amount');
      if (queryAmount) {
        setAmount(queryAmount);
      }
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setMessage('');

    if (!phoneNumber.trim()) {
      setError('Please enter your M-Pesa phone number.');
      return;
    }

    if (!/^254\d{9}$|^0\d{9}$/.test(phoneNumber)) {
      setError('Enter a valid Kenyan phone number like 254712345678 or 0712345678.');
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch('/api/payments/mpesa-stk-push', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobId: 'homepage-application',
          phoneNumber,
          amount: Number(amount),
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Unable to initiate payment.');
      }

      const { message: serverMessage } = await response.json();
      setMessage(serverMessage || 'Payment request sent. Check your phone for the M-Pesa prompt.');

      // Delay briefly so the user sees the confirmation before redirect.
      setTimeout(() => {
        router.push('/applications/success');
      }, 1200);
    } catch (fetchError) {
      console.error(fetchError);
      setError(fetchError instanceof Error ? fetchError.message : 'Payment initiation failed.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_45%),_radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.16),_transparent_30%)] py-14">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 xl:grid-cols-[1.4fr_0.9fr]">
          <section className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-[0_20px_70px_rgba(15,_23,_42,_0.08)]">
            <div className="space-y-6">
              <div className="max-w-2xl">
                <p className="text-sm uppercase tracking-[0.25em] text-brand-600">Secure Payment</p>
                <h1 className="mt-3 text-4xl font-semibold text-slate-900">Complete your KES 500 application fee</h1>
                <p className="mt-4 text-base leading-7 text-slate-600">
                  Finish your application by paying through M-Pesa. Once payment is confirmed, we will begin processing your submission immediately.
                </p>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-8">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-slate-500">Amount due</p>
                    <p className="mt-3 text-3xl font-semibold text-slate-900">KES {amount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Payment method</p>
                    <p className="mt-3 text-lg font-semibold text-brand-600">M-Pesa STK Push</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-medium text-slate-900">Full Name</span>
                    <input
                      type="text"
                      placeholder="Your full name"
                      disabled
                      value="Talex Applicant"
                      className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-700 focus:outline-none"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-medium text-slate-900">Phone number</span>
                    <input
                      type="tel"
                      placeholder="254712345678 or 0712345678"
                      value={phoneNumber}
                      onChange={(event) => setPhoneNumber(event.target.value)}
                      className="mt-3 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                    />
                  </label>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <h2 className="text-lg font-semibold text-slate-900">Payment details</h2>
                  <div className="mt-4 space-y-3 text-sm text-slate-600">
                    <p>Amount: <span className="font-semibold text-slate-900">KES {amount}</span></p>
                    <p>Reference: <span className="font-semibold text-slate-900">Talex Application</span></p>
                    <p>Note: Ensure your phone is ready to confirm the M-Pesa prompt.</p>
                  </div>
                </div>

                {error && (
                  <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    {error}
                  </div>
                )}

                {message && (
                  <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
                    {message}
                  </div>
                )}

                <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-brand-600/20 transition hover:bg-brand-700 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? <Loader className="h-5 w-5 animate-spin" /> : 'Pay KES 500 & Continue'}
                  </button>
                  <button
                    type="button"
                    onClick={() => router.push('/apply')}
                    className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-base font-semibold text-slate-700 transition hover:bg-slate-100"
                  >
                    Review documents
                  </button>
                </div>
              </form>
            </div>
          </section>

          <aside className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-8 shadow-card">
            <div className="rounded-3xl bg-brand-50 p-6">
              <p className="text-sm uppercase tracking-[0.25em] text-brand-600">What happens next</p>
              <ol className="mt-4 space-y-4 text-sm text-slate-600">
                <li>
                  <span className="font-semibold text-slate-900">1.</span> Confirm the M-Pesa prompt on your phone.
                </li>
                <li>
                  <span className="font-semibold text-slate-900">2.</span> Your payment will be verified instantly.
                </li>
                <li>
                  <span className="font-semibold text-slate-900">3.</span> You will be redirected to the application success page.
                </li>
              </ol>
            </div>

            <div className="rounded-3xl border border-slate-200 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Need assistance?</p>
              <p className="mt-3 text-sm text-slate-600">If the prompt does not arrive, please retry or contact our support team for help.</p>
              <p className="mt-3 text-sm text-slate-700">support@talex.com</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
