'use client';

import { CheckCircle, Clock, AlertCircle, XCircle, FileCheck } from 'lucide-react';
import { useApplications } from '@/hooks/useApplications';
import { useAuth } from '@/hooks/useAuth';

const statusConfig = {
  submitted: { label: 'Submitted', color: 'blue', icon: FileCheck },
  reviewed: { label: 'Reviewed', color: 'orange', icon: Clock },
  shortlisted: { label: 'Shortlisted', color: 'yellow', icon: AlertCircle },
  interview: { label: 'Interview', color: 'purple', icon: Clock },
  accepted: { label: 'Accepted', color: 'green', icon: CheckCircle },
  rejected: { label: 'Rejected', color: 'red', icon: XCircle },
  pending: { label: 'Pending', color: 'gray', icon: Clock },
};

export default function ApplicationsPage() {
  const { applications, isLoading, error } = useApplications();
  const { isReady, isAuthenticated } = useAuth();

  if (!isReady) {
    return (
      <div className="flex min-h-[calc(100vh-100px)] items-center justify-center">
        <div className="text-slate-600">Loading your dashboard...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-navy-500 to-navy-600 p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold">Your Applications</h1>
        <p className="mt-2 text-blue-100">Track your Canada job application progress</p>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600 shadow-soft">
          Loading your applications...
        </div>
      ) : applications.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600 shadow-soft">
          <h2 className="text-xl font-semibold text-slate-900">No applications yet</h2>
          <p className="mt-2 text-sm text-slate-600">
            You have not applied for any jobs yet. Browse available roles and submit your first application.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {applications.map((application) => {
            const status = statusConfig[application.status] || statusConfig.submitted;
            const Icon = status.icon;
            const title = application.jobTitle || application.job?.title || 'Unknown role';
            const company = application.company || application.job?.company || 'Unknown company';
            const date = application.appliedAt ? new Date(application.appliedAt).toLocaleDateString() : 'Unknown date';
            const trackingNumber = application.id || application._id || 'N/A';

            return (
              <div key={application.id || application._id || trackingNumber} className="rounded-xl border border-slate-200 bg-white p-6 shadow-soft">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                    <p className="text-sm text-slate-600">{company}</p>
                    <p className="text-sm text-slate-500">Applied on {date}</p>
                    <p className="text-sm text-slate-500">Tracking: {trackingNumber}</p>
                  </div>
                  <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${
                    status.color === 'blue' ? 'bg-blue-50 text-blue-700' :
                    status.color === 'orange' ? 'bg-orange-50 text-orange-700' :
                    status.color === 'yellow' ? 'bg-yellow-50 text-yellow-700' :
                    status.color === 'purple' ? 'bg-purple-50 text-purple-700' :
                    status.color === 'green' ? 'bg-green-50 text-green-700' :
                    'bg-red-50 text-red-700'
                  }`}>
                    <Icon className="h-4 w-4" />
                    {status.label}
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200"></div>
                  <div className="space-y-4 pl-10">
                    {Object.entries(statusConfig).map(([key, config]) => {
                      const statusIndex = Object.keys(statusConfig).indexOf(application.status as keyof typeof statusConfig);
                      const currentIndex = Object.keys(statusConfig).indexOf(key as keyof typeof statusConfig);
                      const isCompleted = statusIndex >= currentIndex;
                      const isCurrent = key === application.status;
                      const StepIcon = config.icon;

                      return (
                        <div key={key} className="relative flex items-center gap-4">
                          <div className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                            isCompleted ? 'bg-green-500 border-green-500 text-white' :
                            isCurrent ? 'bg-white border-slate-300 text-slate-600' :
                            'bg-white border-slate-200 text-slate-400'
                          }`}>
                            <StepIcon className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <p className={`text-sm font-medium ${
                              isCompleted ? 'text-green-700' :
                              isCurrent ? 'text-slate-900' :
                              'text-slate-500'
                            }`}>
                              {config.label}
                            </p>
                            {isCurrent && (
                              <p className="text-xs text-slate-500 mt-1">
                                {key === 'submitted' ? 'Application received and under review' :
                                 key === 'reviewed' ? 'Application reviewed by employer' :
                                 key === 'shortlisted' ? 'Selected for next round' :
                                 key === 'interview' ? 'Interview scheduled' :
                                 key === 'accepted' ? 'Offer extended' :
                                 'Application not successful'}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
