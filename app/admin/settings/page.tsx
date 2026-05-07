import Button from '@/components/ui/button';
import Input from '@/components/ui/input';

export default function AdminSettingsPage() {
  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-card sm:p-10">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.25em] text-brand-600">Admin settings</p>
        <h1 className="text-3xl font-semibold text-slate-900">Platform configuration</h1>
      </div>
      <form className="mt-8 grid gap-6">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-700">Platform email</label>
          <Input type="email" placeholder="admin@talex.co.ke" />
        </div>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-700">Application fee</label>
          <Input placeholder="KES 500" />
        </div>
        <div className="flex justify-end">
          <Button>Save settings</Button>
        </div>
      </form>
    </div>
  );
}
