import Button from '@/components/ui/button';
import Input from '@/components/ui/input';

export default function DashboardSettingsPage() {
  return (
    <div className="space-y-8 rounded-[32px] border border-slate-200 bg-white p-8 shadow-card sm:p-10">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-brand-600">Settings</p>
        <h1 className="text-3xl font-semibold text-slate-900">Account preferences</h1>
      </div>
      <form className="grid gap-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">Notification email</label>
            <Input type="email" placeholder="alerts@example.com" />
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">Phone number</label>
            <Input placeholder="+1 (XXX) XXX-XXXX" />
          </div>
        </div>
        <div className="flex justify-end">
          <Button>Save settings</Button>
        </div>
      </form>
    </div>
  );
}
