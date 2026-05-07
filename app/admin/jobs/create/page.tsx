import Button from '@/components/ui/button';
import Input from '@/components/ui/input';

export default function AdminCreateJobPage() {
  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-card sm:p-10">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.25em] text-brand-600">Create job</p>
        <h1 className="text-3xl font-semibold text-slate-900">Publish a new Canada opportunity</h1>
      </div>
      <form className="mt-8 grid gap-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">Title</label>
            <Input placeholder="Job title" />
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">Company</label>
            <Input placeholder="Company name" />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">Province</label>
            <Input placeholder="Ontario" />
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">Salary</label>
            <Input placeholder="CA$ 18,000 - 25,000/year" />
          </div>
        </div>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-700">Description</label>
          <textarea className="min-h-[140px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none" placeholder="Describe the role and sponsorship details." />
        </div>
        <div className="flex justify-end">
          <Button>Publish job</Button>
        </div>
      </form>
    </div>
  );
}
