export default function ContactPage() {
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
          <p className="mt-3 text-sm text-slate-600">+254 700 000 000</p>
        </div>
      </div>
    </div>
  );
}
