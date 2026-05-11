'use client';

import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';

export default function AdminCreateJobPage() {
  const [requirements, setRequirements] = useState<string[]>(['']);
  const [benefits, setBenefits] = useState<string[]>(['']);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addRequirement = () => setRequirements([...requirements, '']);
  const removeRequirement = (index: number) => {
    if (requirements.length > 1) {
      setRequirements(requirements.filter((_, i) => i !== index));
    }
  };

  const addBenefit = () => setBenefits([...benefits, '']);
  const removeBenefit = (index: number) => {
    if (benefits.length > 1) {
      setBenefits(benefits.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Job created successfully!');
    } catch {
      toast.error('Failed to create job');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-card sm:p-10">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.25em] text-brand-600">Create job</p>
        <h1 className="text-3xl font-semibold text-slate-900">Publish a new Canada opportunity</h1>
      </div>
      <form onSubmit={handleSubmit} className="mt-8 grid gap-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">Title</label>
            <Input name="title" placeholder="Job title" required />
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">Company</label>
            <Input name="company" placeholder="Company name" required />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">Category</label>
            <select name="category" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-brand-500" required>
              <option value="">Select category</option>
              <option value="Technology">Technology</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Hospitality">Hospitality</option>
              <option value="Finance">Finance</option>
              <option value="Education">Education</option>
            </select>
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">Province</label>
            <select name="province" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-brand-500" required>
              <option value="">Select province</option>
              <option value="Ontario">Ontario</option>
              <option value="British Columbia">British Columbia</option>
              <option value="Alberta">Alberta</option>
              <option value="Quebec">Quebec</option>
              <option value="Manitoba">Manitoba</option>
            </select>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">Salary</label>
            <Input name="salary" placeholder="CA$ 45,000 - 55,000/year" required />
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">Deadline</label>
            <Input name="deadline" type="date" required />
          </div>
        </div>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-700">Visa Sponsorship</label>
          <select name="visaSponsorship" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-brand-500" required>
            <option value="">Select visa sponsorship</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="Conditional">Conditional</option>
          </select>
        </div>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-700">Description</label>
          <textarea
            name="description"
            className="min-h-[140px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-brand-500"
            placeholder="Describe the role and sponsorship details."
            required
          />
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-slate-700">Requirements</label>
            <button type="button" onClick={addRequirement} className="text-sm text-brand-600 hover:text-brand-700">+ Add requirement</button>
          </div>
          {requirements.map((req, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={req}
                onChange={(e) => {
                  const newReqs = [...requirements];
                  newReqs[index] = e.target.value;
                  setRequirements(newReqs);
                }}
                placeholder="Enter requirement"
                required
              />
              {requirements.length > 1 && (
                <button type="button" onClick={() => removeRequirement(index)} className="text-red-500 hover:text-red-700">×</button>
              )}
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-slate-700">Benefits</label>
            <button type="button" onClick={addBenefit} className="text-sm text-brand-600 hover:text-brand-700">+ Add benefit</button>
          </div>
          {benefits.map((benefit, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={benefit}
                onChange={(e) => {
                  const newBenefits = [...benefits];
                  newBenefits[index] = e.target.value;
                  setBenefits(newBenefits);
                }}
                placeholder="Enter benefit"
                required
              />
              {benefits.length > 1 && (
                <button type="button" onClick={() => removeBenefit(index)} className="text-red-500 hover:text-red-700">×</button>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Publishing...' : 'Publish job'}
          </Button>
        </div>
      </form>
    </div>
  );
}
