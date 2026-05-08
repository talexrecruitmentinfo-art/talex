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
          <p className="mt-3 text-sm text-slate-600">+1 (XXX) XXX-XXXX</p>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-900">Send us a message</h2>
        <form className="space-y-4" action="mailto:talex.recruitment.info@gmail.com" method="post" encType="text/plain">
          <div className="space-y-2">
            <label htmlFor="subject" className="block text-sm font-medium text-slate-700">
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              placeholder="Enter subject"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-medium text-slate-700">
              Message
            </label>
            <textarea
              id="message"
              name="body"
              rows={4}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              placeholder="Enter your message"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-600"
          >
            Send Email
          </button>
        </form>
      </div>
    </div>
  );
}
