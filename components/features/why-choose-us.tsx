'use client';

import { Shield, CreditCard, Zap, Users } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const features: Feature[] = [
  {
    title: 'Government Approved',
    description: 'Official Government of Canada employment portal with full regulatory compliance and oversight.',
    icon: <Shield className="h-8 w-8 text-government-primary" />,
  },
  {
    title: 'Secure Processing',
    description: 'Government-grade security with SSL encryption. All payments and data are fully protected.',
    icon: <CreditCard className="h-8 w-8 text-government-primary" />,
  },
  {
    title: 'Official Verification',
    description: 'All positions are verified by Canadian immigration authorities and government partners.',
    icon: <Users className="h-8 w-8 text-government-primary" />,
  },
  {
    title: 'Streamlined Process',
    description: 'Official application procedures with real-time status tracking and government support.',
    icon: <Zap className="h-8 w-8 text-government-primary" />,
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="py-16 sm:py-24 bg-government-light">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-government-secondary">Official Services</p>
          <h2 className="mt-2 text-4xl font-bold text-government-dark">Government Employment Portal</h2>
          <p className="mt-4 text-lg text-government-gray">Official features and benefits of the Canadian government employment system</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-government-gray bg-white p-6 shadow-government hover:shadow-card hover:border-government-primary transition"
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
