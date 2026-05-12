import HeroSection from '@/components/features/hero-section';
import TestimonialsSection from '@/components/features/testimonials-section';
import WhyChooseUsSection from '@/components/features/why-choose-us';

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <HeroSection />

      {/* How It Works */}
      <section className="space-y-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-500">Process</p>
          <h2 className="mt-2 text-4xl font-bold text-navy-900">How It Works</h2>
          <p className="mt-4 text-lg text-slate-600">Simple steps to apply for your dream Canada job</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { step: 1, title: 'Create Account', desc: 'Sign up with your email' },
            { step: 2, title: 'Prepare Documents', desc: 'Upload CV and passport page' },
            { step: 3, title: 'Pay Fee', desc: 'Application fee: Ksh 500' },
            { step: 4, title: 'Submit Application', desc: 'Complete the upload and payment flow' },
            { step: 5, title: 'Track Status', desc: 'Monitor your progress' },
          ].map((item) => (
            <div
              key={item.step}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-soft hover:shadow-card transition"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-600 font-bold text-lg">
                {item.step}
              </div>
              <h3 className="font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="rounded-2xl bg-gradient-to-r from-navy-500 to-navy-600 px-8 py-16 text-white shadow-card">
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="text-center">
            <div className="text-5xl font-bold">2,500+</div>
            <p className="mt-2 text-blue-100">Applications Submitted</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold">450+</div>
            <p className="mt-2 text-blue-100">Active Jobs</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold">180+</div>
            <p className="mt-2 text-blue-100">Approved Applicants</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUsSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <section className="rounded-2xl bg-brand-500 px-8 py-16 text-white shadow-card">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold">Ready to Apply?</h2>
            <p className="mt-4 text-lg text-brand-100">
              Join thousands of Kenyan professionals who have already found their dream Canada jobs.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
