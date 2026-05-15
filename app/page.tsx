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
          <p className="text-sm font-semibold uppercase tracking-wider text-government-secondary">Official Process</p>
          <h2 className="mt-2 text-4xl font-bold text-government-dark">Application Procedure</h2>
          <p className="mt-4 text-lg text-government-gray">Follow these official steps to apply for Canadian employment opportunities</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { step: 1, title: 'Register Account', desc: 'Create your official applicant profile' },
            { step: 2, title: 'Prepare Documents', desc: 'Upload required CV and identification' },
            { step: 3, title: 'Process Payment', desc: 'Application fee: Ksh 500 (government processing)' },
            { step: 4, title: 'Submit Application', desc: 'Complete the official submission process' },
            { step: 5, title: 'Track Progress', desc: 'Monitor your application status' },
          ].map((item) => (
            <div
              key={item.step}
              className="rounded-xl border border-government-gray bg-white p-6 shadow-government hover:shadow-card transition"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-government-primary text-white font-bold text-lg">
                {item.step}
              </div>
              <h3 className="font-semibold text-government-dark">{item.title}</h3>
              <p className="mt-2 text-sm text-government-gray">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="rounded-2xl bg-gradient-to-r from-government-primary to-government-secondary px-8 py-16 text-white shadow-government">
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="text-center">
            <div className="text-5xl font-bold">2,500+</div>
            <p className="mt-2 text-government-gray">Applications Processed</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold">450+</div>
            <p className="mt-2 text-government-gray">Verified Positions</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold">180+</div>
            <p className="mt-2 text-government-gray">Successful Placements</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUsSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <section className="rounded-2xl bg-government-primary px-8 py-16 text-white shadow-government">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold">Begin Your Application</h2>
            <p className="mt-4 text-lg text-government-gray">
              Start your official application process for Canadian employment opportunities through the Government of Canada portal.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
