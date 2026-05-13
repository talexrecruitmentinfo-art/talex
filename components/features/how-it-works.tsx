const steps = [
  { label: 'Create account', description: 'Register with your phone and email to start applying.' },
  { label: 'Complete profile', description: 'Add your education, experience, and documents.' },
  { label: 'Explore roles', description: 'Filter verified Canada positions for your skill set.' },
  { label: 'Apply & pay', description: 'Submit your application and complete the M-Pesa fee.' },
  { label: 'Track application', description: 'Follow your progress from the dashboard.' },
];

export default function HowItWorks() {
  return (
    <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-card sm:p-10">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.25em] text-brand-600">How it works</p>
        <h2 className="text-3xl font-semibold text-slate-900">A simple 5-step application flow</h2>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, index) => (
          <div key={step.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-brand-500 text-lg font-bold text-white">{index + 1}</div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">{step.label}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
