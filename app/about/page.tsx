export default function AboutPage() {
  return (
    <div className="space-y-12">
      <section className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-8 shadow-card sm:p-10">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-brand-600">About Talex</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
            Connecting Kenyan Talent to Canadian Opportunities
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Talex is a trusted job matching platform bridging the gap between ambitious job seekers in Kenya and verified Canadian employers seeking skilled workers.
          </p>
        </div>
      </section>

      <section className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-8 shadow-card sm:p-10">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Our Mission</h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            To empower Kenyan job seekers by providing transparent, secure access to visa-sponsored Canadian employment opportunities. We believe every qualified individual deserves a fair chance at building their career abroad, regardless of their location.
          </p>
        </div>
      </section>

      <section className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-8 shadow-card sm:p-10">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Our Vision</h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            To become the leading trusted platform connecting African talent with global employment opportunities, starting with Canada. We envision a future where geography is no barrier to opportunity.
          </p>
        </div>
      </section>

      <section className="space-y-8 rounded-[32px] border border-slate-200 bg-white p-8 shadow-card sm:p-10">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Why Choose Talex?</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-3xl bg-slate-50 p-6">
            <div className="text-3xl font-bold text-brand-500">✓</div>
            <h3 className="mt-3 text-lg font-semibold text-slate-900">Verified Employers</h3>
            <p className="mt-2 text-sm text-slate-600">
              Every employer on our platform is thoroughly vetted for legitimacy and visa sponsorship capability.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-6">
            <div className="text-3xl font-bold text-brand-500">✓</div>
            <h3 className="mt-3 text-lg font-semibold text-slate-900">Secure Payments</h3>
            <p className="mt-2 text-sm text-slate-600">
              M-Pesa integration ensures your application fees are processed safely with complete transparency.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-6">
            <div className="text-3xl font-bold text-brand-500">✓</div>
            <h3 className="mt-3 text-lg font-semibold text-slate-900">Mobile-First Design</h3>
            <p className="mt-2 text-sm text-slate-600">
              Optimized for low-end Android devices with minimal data usage—perfect for Kenya.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-6">
            <div className="text-3xl font-bold text-brand-500">✓</div>
            <h3 className="mt-3 text-lg font-semibold text-slate-900">No Hidden Charges</h3>
            <p className="mt-2 text-sm text-slate-600">
              Transparent pricing with a fixed KES 500 application fee. No surprise costs.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-6">
            <div className="text-3xl font-bold text-brand-500">✓</div>
            <h3 className="mt-3 text-lg font-semibold text-slate-900">Simple Process</h3>
            <p className="mt-2 text-sm text-slate-600">
              Register, complete your profile, browse jobs, apply, and track your progress—all in steps.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-6">
            <div className="text-3xl font-bold text-brand-500">✓</div>
            <h3 className="mt-3 text-lg font-semibold text-slate-900">Local Support</h3>
            <p className="mt-2 text-sm text-slate-600">
              Dedicated team ready to assist with questions at talex.recruitment.info@gmail.com
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-8 rounded-[32px] border border-slate-200 bg-white p-8 shadow-card sm:p-10">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Our Commitment</h2>
        </div>
        <div className="space-y-6 text-slate-600">
          <p className="text-base leading-8">
            <span className="font-semibold text-slate-900">Trust & Transparency:</span> We operate with complete transparency. Every job, every employer, and every policy is designed with your interests first.
          </p>
          <p className="text-base leading-8">
            <span className="font-semibold text-slate-900">Security & Privacy:</span> Your personal data and documents are encrypted and protected. We never share information without your explicit consent.
          </p>
          <p className="text-base leading-8">
            <span className="font-semibold text-slate-900">Equal Opportunity:</span> We believe talent knows no borders. We&apos;re committed to fair treatment for every applicant.
          </p>
          <p className="text-base leading-8">
            <span className="font-semibold text-slate-900">Continuous Improvement:</span> We listen to our users and constantly enhance our platform based on your feedback.
          </p>
        </div>
      </section>

      <section className="space-y-6 rounded-[32px] border border-slate-200 bg-gradient-to-br from-brand-50 to-slate-50 p-8 shadow-card sm:p-10">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Join Us Today</h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            Thousands of Kenyans have already started their journey to Canada through Talex. Verified employers are actively hiring. Your next opportunity could be just a few clicks away.
          </p>
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
