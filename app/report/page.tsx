export default function ReportPage() {
  const questions = [
    "Technical issue with the website",
    "Problem with job applications",
    "Payment or billing issue",
    "Account login or registration problem",
    "Profile update issue",
    "Other"
  ];

  return (
    <div className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-8 shadow-card">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-brand-600">Report</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">Report an issue</h1>
      </div>
      <p className="text-sm leading-7 text-slate-600">Select the issue you're experiencing and we'll help resolve it.</p>
      <form className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            What issue are you facing?
          </label>
          <div className="space-y-2">
            {questions.map((question, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="issue"
                  value={question}
                  className="text-brand-500 focus:ring-brand-500"
                />
                <span className="text-sm text-slate-700">{question}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="details" className="block text-sm font-medium text-slate-700">
            Additional details (optional)
          </label>
          <textarea
            id="details"
            name="details"
            rows={4}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            placeholder="Provide more details about your issue"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-600"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
}