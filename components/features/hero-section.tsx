import Link from 'next/link';
import { ArrowRight, Shield, Globe, Zap } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="rounded-2xl bg-gradient-to-r from-navy-500 to-navy-600 px-6 py-12 shadow-lg sm:px-10 sm:py-16">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        {/* Left Side - Content */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-400/20 px-4 py-2 border border-blue-300/30">
            <span className="h-2 w-2 bg-yellow-300 rounded-full"></span>
            <span className="text-sm font-medium text-white">Official Canada Job Portal for Kenyans</span>
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Canada Employment Portal
          </h1>

          <p className="mt-6 text-lg text-blue-100">
            Apply for verified visa-sponsored opportunities from Kenya. Secure payments. Fast processing. Professional support.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/jobs" className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-base font-semibold text-navy-600 hover:bg-blue-50 transition shadow-md">
              Browse Jobs <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/register" className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition">
              Create Account
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { icon: Shield, label: 'Secure & Verified' },
              { icon: Globe, label: 'Government-Approved' },
              { icon: Zap, label: 'Fast Processing' },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-yellow-300/20">
                    <Icon className="h-5 w-5 text-yellow-300" />
                  </div>
                  <span className="text-sm font-medium text-blue-100">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side - Info Card */}
        <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-8 shadow-xl">
          <h3 className="text-xl font-semibold text-white mb-6">Quick Application Steps</h3>
          <div className="space-y-4">
            {[
              { num: '1', text: 'Create your profile' },
              { num: '2', text: 'Browse verified jobs' },
              { num: '3', text: 'Pay Ksh 500 fee' },
              { num: '4', text: 'Submit application' },
              { num: '5', text: 'Track progress' },
            ].map((step) => (
              <div key={step.num} className="flex items-center gap-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-yellow-300 font-bold text-navy-900">
                  {step.num}
                </div>
                <span className="text-white">{step.text}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-8 border-t border-white/20 pt-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-blue-100">Applications Processed</span>
              <span className="font-semibold text-white">2,500+</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-blue-100">Active Jobs</span>
              <span className="font-semibold text-white">450+</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-blue-100">Approved Applications</span>
              <span className="font-semibold text-white">180+</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
