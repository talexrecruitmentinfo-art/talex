import Button from '@/components/ui/button';
import Input from '@/components/ui/input';

export default function AdminLoginPage() {
  return (
    <div className="mx-auto max-w-xl rounded-[32px] border border-slate-200 bg-white p-8 shadow-card sm:p-10">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.25em] text-brand-600">Admin sign in</p>
        <h1 className="text-3xl font-semibold text-slate-900">Admin access</h1>
      </div>
      <form className="mt-8 space-y-6">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-700">Email</label>
          <Input type="email" placeholder="admin@example.com" />
        </div>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-700">Password</label>
          <Input type="password" placeholder="Enter password" />
        </div>
        <Button className="w-full">Sign In</Button>
      </form>
    </div>
  );
}
