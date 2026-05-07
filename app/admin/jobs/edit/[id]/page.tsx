import Button from '@/components/ui/button';
import Input from '@/components/ui/input';

export default function AdminEditJobPage() {
  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-card sm:p-10">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.25em] text-brand-600">Edit job</p>
        <h1 className="text-3xl font-semibold text-slate-900">Update job listing</h1>
      </div>
      <form className="mt-8 grid gap-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">Title</label>
            <Input placeholder="Job title" value="Hospitality Supervisor" />
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">Company</label>
            <Input placeholder="Company name" value="True North Staffing" />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">Province</label>
            <Input placeholder="Ontario" value="Ontario" />
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">Salary</label>
            <Input placeholder="KES 180,000 - 250,000" value="KES 180,000 - 250,000" />
          </div>
        </div>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-700">Description</label>
          <textarea className="min-h-[140px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none">Work with a trusted Canadian hospitality employer to support guest services, team coordination, and operations.</textarea>
        </div>
        <div className="flex justify-end">
          <Button>Save changes</Button>
        </div>
      </form>
    </div>
  );
}
