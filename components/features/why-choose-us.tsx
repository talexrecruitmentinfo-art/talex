'use client';

import { Shield, CreditCard, Zap, Users } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const features: Feature[] = [
  {
    title: 'Verified Jobs',
    description: 'All job listings are verified and directly from Canadian employers. No scams, no false promises.',
    icon: <Shield className="h-8 w-8 text-brand-500" />,
  },
  {
    title: 'Secure Payments',
    description: 'Pay via M-Pesa with SSL encryption. Your payment information is completely safe and protected.',
    icon: <CreditCard className="h-8 w-8 text-brand-500" />,
  },
  {
    title: 'Trusted Platform',
    description: 'Trusted by thousands of Kenyans who successfully got visa-sponsored jobs in Canada.',
    icon: <Users className="h-8 w-8 text-brand-500" />,
  },
  {
    title: 'Fast Applications',
    description: 'Submit applications in minutes. Real-time tracking. Get responses from employers in days.',
    icon: <Zap className="h-8 w-8 text-brand-500" />,
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="py-16 sm:py-24 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-500">Why Choose Us</p>
          <h2 className="mt-2 text-4xl font-bold text-slate-900">The Talex Difference</h2>
          <p className="mt-4 text-lg text-slate-600">Industry-leading features that set us apart</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-soft hover:shadow-card hover:border-brand-200 transition"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="font-semibold text-slate-900 text-lg">{feature.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
