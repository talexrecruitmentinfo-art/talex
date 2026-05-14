'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { toast } from 'sonner';
import type { Job } from '@/types/job';
import { adminService } from '@/services/adminService';

export default function AdminCreateJobPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [category, setCategory] = useState('');
  const [province, setProvince] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [deadline, setDeadline] = useState('');
  const [jobType, setJobType] = useState('Full-time');
  const [experience, setExperience] = useState('Mid-level');
  const [visaSponsorship, setVisaSponsorship] = useState('');
  const [description, setDescription] = useState('');
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
      const jobData: Partial<Job> = {
        title,
        company,
        category,
        province,
        location,
        salary,
        deadline,
        type: jobType,
        experience,
        description,
        requirements: requirements.filter(Boolean),
        benefits: benefits.filter(Boolean),
        sponsored: false,
      };

      await adminService.createJob(jobData);
      toast.success('Job created successfully!');
      router.push('/admin/jobs');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create job';
      toast.error(message);
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
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Job title" required />
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">Company</label>
            <Input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company name" required />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-brand-500" required>
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
            <select value={province} onChange={(e) => setProvince(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-brand-500" required>
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
            <label className="block text-sm font-medium text-slate-700">Location</label>
            <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City or region" required />
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">Experience level</label>
            <select value={experience} onChange={(e) => setExperience(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-brand-500" required>
              <option value="Junior">Junior</option>
              <option value="Mid-level">Mid-level</option>
              <option value="Senior">Senior</option>
              <option value="Director">Director</option>
            </select>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">Salary</label>
            <Input value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="CA$ 45,000 - 55,000/year" required />
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">Deadline</label>
            <Input value={deadline} onChange={(e) => setDeadline(e.target.value)} type="date" required />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">Job type</label>
            <select value={jobType} onChange={(e) => setJobType(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-brand-500" required>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Temporary">Temporary</option>
            </select>
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">Visa Sponsorship</label>
            <select value={visaSponsorship} onChange={(e) => setVisaSponsorship(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-brand-500" required>
              <option value="">Select visa sponsorship</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Conditional">Conditional</option>
            </select>
          </div>
        </div>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
