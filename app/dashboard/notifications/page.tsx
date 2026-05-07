export default function NotificationsPage() {
  return (
    <div className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-8 shadow-card sm:p-10">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-brand-600">Notifications</p>
        <h1 className="text-3xl font-semibold text-slate-900">Recent alerts</h1>
      </div>
      <div className="space-y-4">
        {[
          { title: 'Payment successful', detail: 'KES 500 application fee processed.' },
          { title: 'Application reviewed', detail: 'Your hospitality application is under review.' },
        ].map((item) => (
          <div key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="font-semibold text-slate-900">{item.title}</p>
            <p className="mt-2 text-sm text-slate-600">{item.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
