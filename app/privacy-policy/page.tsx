export default function PrivacyPolicyPage() {
  return (
    <div className="space-y-8 rounded-[32px] border border-slate-200 bg-white p-8 shadow-card sm:p-10">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-brand-600">Privacy Policy</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">Privacy Policy</h1>
        <p className="mt-2 text-sm text-slate-600">Last updated: May 7, 2026</p>
      </div>

      <div className="prose prose-sm max-w-none space-y-6 text-slate-600">
        <section>
          <h2 className="text-lg font-semibold text-slate-900">1. Introduction</h2>
          <p>
            Talex ("we," "us," "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">2. Information We Collect</h2>
          <p>We collect information you provide directly, including:</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Full name, phone number, and email address</li>
            <li>Date of birth and nationality</li>
            <li>Education and work experience</li>
            <li>Documents (CV, passport, certificates)</li>
            <li>Payment information for M-Pesa transactions</li>
            <li>Browsing activity and usage patterns</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">3. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Process job applications and payments</li>
            <li>Match you with relevant job opportunities</li>
            <li>Communicate about your applications</li>
            <li>Prevent fraud and secure the platform</li>
            <li>Improve our services and user experience</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">4. Data Security</h2>
          <p>
            We implement industry-standard security measures including encryption, secure authentication, and regular security audits. However, no method is 100% secure. You are responsible for keeping your password confidential.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">5. Information Sharing</h2>
          <p>
            We share your information with verified Canadian employers only after you submit an application. Your profile and documents are provided to help employers evaluate your candidacy. We do not sell or rent your data to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">6. Cookies and Tracking</h2>
          <p>
            We use cookies to enhance your experience, remember preferences, and analyze usage. You can control cookie settings in your browser. Some features may not work properly if cookies are disabled.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">7. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Access your personal data</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your account and data</li>
            <li>Opt-out of marketing communications</li>
            <li>Withdraw consent at any time</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">8. Data Retention</h2>
          <p>
            We retain your information for as long as your account is active or as necessary to provide our services. Upon account deletion, we retain certain information for legal and security purposes.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">9. Children's Privacy</h2>
          <p>
            Our platform is not intended for users under 18 years old. We do not knowingly collect information from minors. If we become aware of such collection, we will delete it immediately.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy periodically. Continued use of the platform constitutes acceptance of any updates. We will notify you of significant changes via email.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">11. Contact Us</h2>
          <p>
            For privacy-related questions or data requests, contact us at talex.recruitment.info@gmail.com
          </p>
        </section>
      </div>
    </div>
  );
}
