import Button from '@/components/ui/button';
import Input from '@/components/ui/input';

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-card sm:p-10">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.25em] text-brand-600">Profile</p>
          <h1 className="text-3xl font-semibold text-slate-900">Your profile details</h1>
        </div>
        <form className="grid gap-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-700">Full name</label>
              <Input placeholder="John Doe" />
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-700">Date of birth</label>
              <Input type="date" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-700">Phone</label>
              <Input placeholder="+1 (XXX) XXX-XXXX" />
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-700">Email</label>
              <Input type="email" placeholder="name@example.com" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-700">Nationality</label>
              <Input placeholder="Kenyan" />
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-700">Address</label>
              <Input placeholder="Toronto, ON" />
            </div>
          </div>
          <div className="flex justify-end">
            <Button>Save profile</Button>
          </div>
        </form>
      </section>
    </div>
  );
}
