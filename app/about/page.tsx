'use client';

import { useEffect, useState } from 'react';
import { aboutService } from '@/services/apiService';

interface Feature {
  title: string;
  description: string;
}

interface AboutInfo {
  title: string;
  headline: string;
  description: string;
  mission: string;
  vision: string;
  features: Feature[];
  ctaHeadline: string;
  ctaDescription: string;
}

const fallbackAboutInfo: AboutInfo = {
  title: 'About Talex',
  headline: 'Connecting Kenyan Talent to Canadian Opportunities',
  description:
    'Talex is a trusted job matching platform bridging the gap between ambitious job seekers in Kenya and verified Canadian employers seeking skilled workers.',
  mission:
    'To empower Kenyan job seekers by providing transparent, secure access to visa-sponsored Canadian employment opportunities.',
  vision:
    'To become the leading trusted platform connecting African talent with global employment opportunities, starting with Canada.',
  features: [
    {
      title: 'Verified Employers',
      description:
        'Every employer on our platform is thoroughly vetted for legitimacy and visa sponsorship capability.',
    },
    {
      title: 'Secure Payments',
      description:
        'M-Pesa integration ensures your application fees are processed safely with complete transparency.',
    },
    {
      title: 'Mobile-First Design',
      description:
        'Optimized for low-end Android devices with minimal data usage—perfect for Kenya.',
    },
    {
      title: 'No Hidden Charges',
      description: 'Transparent pricing with a fixed KES 500 application fee. No surprise costs.',
    },
    {
      title: 'Simple Process',
      description:
        'Register, complete your profile, browse jobs, apply, and track your progress—all in steps.',
    },
    {
      title: 'Local Support',
      description: 'Dedicated team ready to assist with questions at talex.recruitment.info@gmail.com',
    },
  ],
  ctaHeadline: 'Join Us Today',
  ctaDescription:
    'Thousands of Kenyans have already started their journey to Canada through Talex. Verified employers are actively hiring. Your next opportunity could be just a few clicks away.',
};

export default function AboutPage() {
  const [aboutInfo, setAboutInfo] = useState<AboutInfo>(fallbackAboutInfo);

  useEffect(() => {
    const loadAboutInfo = async () => {
      try {
        const apiData = (await aboutService.getInfo()) as Partial<AboutInfo>;
        if (apiData) {
          setAboutInfo((prev) => ({
            ...prev,
            ...apiData,
            features: apiData.features ?? prev.features,
          }));
        }
      } catch {
        // Keep fallback content if backend fetch fails
      }
    };

    loadAboutInfo();
  }, []);

  return (
    <div className="space-y-12">
      <section className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-8 shadow-card sm:p-10">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-brand-600">{aboutInfo.title}</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">{aboutInfo.headline}</h1>
          <p className="mt-4 text-lg text-slate-600">{aboutInfo.description}</p>
        </div>
      </section>

      <section className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-8 shadow-card sm:p-10">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Our Mission</h2>
          <p className="mt-4 text-base leading-8 text-slate-600">{aboutInfo.mission}</p>
        </div>
      </section>

      <section className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-8 shadow-card sm:p-10">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Our Vision</h2>
          <p className="mt-4 text-base leading-8 text-slate-600">{aboutInfo.vision}</p>
        </div>
      </section>

      <section className="space-y-8 rounded-[32px] border border-slate-200 bg-white p-8 shadow-card sm:p-10">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Why Choose Talex?</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {aboutInfo.features.map((feature) => (
            <div key={feature.title} className="rounded-3xl bg-slate-50 p-6">
              <div className="text-3xl font-bold text-brand-500">✓</div>
              <h3 className="mt-3 text-lg font-semibold text-slate-900">{feature.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8 rounded-[32px] border border-slate-200 bg-gradient-to-br from-brand-50 to-slate-50 p-8 shadow-card sm:p-10">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">{aboutInfo.ctaHeadline}</h2>
          <p className="mt-4 text-base leading-8 text-slate-600">{aboutInfo.ctaDescription}</p>
        </div>
        <a
          href="/register"
          className="inline-flex rounded-full bg-brand-500 px-8 py-4 text-sm font-semibold text-white transition hover:bg-brand-600"
        >
          Create Your Account
        </a>
      </section>
    </div>
  );
}
