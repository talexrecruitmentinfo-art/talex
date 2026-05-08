export default function TermsPage() {
  return (
    <div className="space-y-8 rounded-[32px] border border-slate-200 bg-white p-8 shadow-card sm:p-10">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-brand-600">Terms</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">Terms of Service</h1>
        <p className="mt-2 text-sm text-slate-600">Last updated: May 7, 2026</p>
      </div>

      <div className="prose prose-sm max-w-none space-y-6 text-slate-600">
        <section>
          <h2 className="text-lg font-semibold text-slate-900">1. Introduction</h2>
          <p>
            Talex is a job matching platform connecting Canadian employers with job seekers in Kenya. By using our platform, you agree to these terms of service. Talex is not an employer; we facilitate job applications and payments between users and verified employers.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">2. User Eligibility</h2>
          <p>You must be:</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>At least 18 years old</li>
            <li>A resident of Kenya</li>
            <li>Capable of entering into a binding contract</li>
            <li>Authorized to work in the country of intended employment</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">3. Account Responsibility</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account information and password. You agree to accept responsibility for all activities under your account. Notify us immediately of any unauthorized use.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">4. Application Fees</h2>
          <p>
            A non-refundable application fee of KES 500 (or equivalent) is required per job application. This fee grants access to submit your profile to verified employers. Payments are processed through M-Pesa and are final.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">5. User Conduct</h2>
          <p>You agree not to:</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Provide false or misleading information</li>
            <li>Violate the rights of other users or employers</li>
            <li>Engage in harassment, fraud, or illegal activity</li>
            <li>Reverse-engineer or attempt to access restricted areas</li>
            <li>Share your account with unauthorized persons</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">6. Visa Sponsorship Disclaimer</h2>
          <p>
            Talex does not guarantee visa approval or employment. While all listed employers support visa sponsorship, final approval is the responsibility of Canadian immigration authorities. Users acknowledge they are applying at their own risk.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">7. Limitation of Liability</h2>
          <p>
            Talex is provided &quot;as-is&quot; without warranties. We are not liable for job rejections, visa denials, payment disputes, or employment-related issues. Our liability is limited to the application fee paid.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">8. Termination</h2>
          <p>
            We reserve the right to terminate accounts that violate these terms. Terminated users will lose access to the platform and may forfeit pending applications.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">9. Changes to Terms</h2>
          <p>
            Talex reserves the right to modify these terms at any time. Continued use of the platform constitutes acceptance of updated terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">10. Contact</h2>
          <p>
            For questions about these terms, contact us at talex.recruitment.info@gmail.com
          </p>
        </section>
      </div>
    </div>
  );
}
