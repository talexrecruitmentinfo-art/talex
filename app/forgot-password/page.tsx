import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <div className="space-y-8">
          <div className="space-y-3 text-center">
            <div className="text-4xl font-bold">
              <span className="text-red-500">T</span>
              <span className="text-blue-500">a</span>
              <span className="text-green-500">l</span>
              <span className="text-purple-500">e</span>
              <span className="text-orange-500">x</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Reset your password
            </h1>
            <p className="text-sm text-slate-600">
              Enter your email or phone to receive recovery instructions.
            </p>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-card">
            <form className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                  Email address
                </label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="text"
                />
              </div>

              <Button className="w-full">Send reset link</Button>

              <Link
                href="/login"
                className="block rounded-2xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Back to sign in
              </Link>
            </form>

            <div className="mt-6 rounded-3xl bg-slate-50 p-4">
              <p className="text-xs text-slate-600">
                <span className="font-semibold text-slate-900">Tip:</span> Check your email and phone for recovery instructions. Links are valid for 24 hours.
              </p>
            </div>
          </div>

          <div className="text-center text-sm text-slate-600">
            Remember your password?{' '}
            <Link href="/login" className="font-semibold text-brand-500 hover:text-brand-600">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
