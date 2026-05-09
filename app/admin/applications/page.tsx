'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/authStore';
import { adminService } from '@/services/apiService';
import type { Application, PipelineStage } from '@/types/application';
import { getErrorMessage, downloadOfferLetter, getPipelineStageInfo } from '@/utils/helpers';

export default function AdminApplicationsPage() {
  const { user } = useAuthStore();
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is admin
    if (user && user.role !== 'ADMIN') {
      setError('Access denied. Admin only.');
      setIsLoading(false);
      return;
    }

    const fetchApplications = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await adminService.getApplications();
        setApplications(data);
      } catch (err) {
        const errorMsg = getErrorMessage(err, 'Failed to fetch applications');
        setError(errorMsg);
        toast.error(errorMsg);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, [user]);

  const handleStatusUpdate = async (applicationId: string, newStatus: 'accepted' | 'rejected') => {
    if (updatingId) return;

    try {
      setUpdatingId(applicationId);
      await adminService.updateApplicationStatus(applicationId, newStatus);

      // Update local state
      setApplications((prev) =>
        prev.map((app) =>
          app.id === applicationId || app._id === applicationId
            ? { ...app, status: newStatus }
            : app
        )
      );

      toast.success(`Application ${newStatus}`);
    } catch (err) {
      const errorMsg = getErrorMessage(err, 'Failed to update application');
      toast.error(errorMsg);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleStageUpdate = async (applicationId: string, stage: PipelineStage) => {
    if (updatingId) return;

    try {
      setUpdatingId(applicationId);
      await adminService.updateApplicationStage(applicationId, stage);

      // Update local state
      setApplications((prev) =>
        prev.map((app) =>
          app.id === applicationId || app._id === applicationId
            ? { ...app, pipelineStage: stage }
            : app
        )
      );

      toast.success(`Stage updated to ${stage}`);
    } catch (err) {
      const errorMsg = getErrorMessage(err, 'Failed to update stage');
      toast.error(errorMsg);
    } finally {
      setUpdatingId(null);
    }
  };

  const getResumeDownloadUrl = (resumeUrl: string | null | undefined): string => {
    if (!resumeUrl) return '';
    return resumeUrl.includes('/upload/')
      ? resumeUrl.replace('/upload/', '/upload/fl_attachment/')
      : resumeUrl;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'text-green-600 bg-green-50';
      case 'rejected':
        return 'text-red-600 bg-red-50';
      case 'pending':
      case 'submitted':
        return 'text-amber-600 bg-amber-50';
      default:
        return 'text-slate-600 bg-slate-50';
    }
  };

  if (!user) {
    return (
      <div className="rounded-[32px] border border-slate-200 bg-white p-8 text-center">
        <p className="text-slate-600">Please log in to access this page.</p>
      </div>
    );
  }

  if (user.role !== 'ADMIN') {
    return (
      <div className="rounded-[32px] border border-slate-200 bg-white p-8 text-center">
        <p className="text-red-600 font-semibold">Access Denied</p>
        <p className="text-slate-600 mt-2">Only administrators can view this page.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="rounded-[32px] border border-slate-200 bg-white p-8 text-center">
        <p className="text-slate-600">Loading applications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-[32px] border border-slate-200 bg-white p-8 text-center">
        <p className="text-red-600 font-semibold">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-8 shadow-card sm:p-10">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-brand-600">Applications</p>
        <h1 className="text-3xl font-semibold text-slate-900">Review Applicants</h1>
        <p className="text-sm text-slate-600 mt-2">{applications.length} applications</p>
      </div>

      {applications.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-slate-600">No applications yet</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-200 bg-slate-50">
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                  Applicant
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                  Job
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                  Resume
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                  Pipeline
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => {
                const appId = app.id || app._id || '';
                const resumeUrl = app.applicant?.resume;
                const downloadUrl = getResumeDownloadUrl(resumeUrl);
                const isPending = app.status === 'pending' || app.status === 'submitted';
                const pipelineStage = app.pipelineStage || 'applied';
                const stageInfo = getPipelineStageInfo(pipelineStage);

                return (
                  <tr
                    key={appId}
                    className="border-b border-slate-200 hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-4 py-4 text-sm text-slate-900">
                      {app.applicant?.fullName || 'N/A'}
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600">
                      {app.applicant?.email || 'N/A'}
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-900">
                      {app.job?.title || app.jobTitle || 'N/A'}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      {resumeUrl ? (
                        <div className="flex gap-2">
                          <a
                            href={resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700 underline"
                          >
                            View
                          </a>
                          {downloadUrl && (
                            <a
                              href={downloadUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              download
                              className="text-green-600 hover:text-green-700 underline"
                            >
                              Download
                            </a>
                          )}
                        </div>
                      ) : (
                        <span className="text-slate-500">No Resume</span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <span
                        className={`inline-block px-3 py-1 rounded-full font-medium ${getStatusColor(app.status)}`}
                      >
                        {app.status === 'pending' || app.status === 'submitted'
                          ? 'Pending'
                          : app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <span className={`inline-block px-3 py-1 rounded-full font-medium ${stageInfo.color}`}>
                        {stageInfo.icon} {stageInfo.label}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-xs">
                      <div className="space-y-2 flex flex-col">
                        {/* Accept/Reject */}
                        {isPending && (
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleStatusUpdate(appId, 'accepted')}
                              disabled={updatingId === appId}
                              className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 transition-colors font-medium"
                            >
                              {updatingId === appId ? '...' : 'Accept'}
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(appId, 'rejected')}
                              disabled={updatingId === appId}
                              className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 transition-colors font-medium"
                            >
                              {updatingId === appId ? '...' : 'Reject'}
                            </button>
                          </div>
                        )}

                        {/* Pipeline stages */}
                        <div className="flex gap-1 flex-wrap">
                          <button
                            onClick={() => handleStageUpdate(appId, 'review')}
                            disabled={updatingId === appId}
                            className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 disabled:opacity-50 transition-colors"
                          >
                            Review
                          </button>
                          <button
                            onClick={() => handleStageUpdate(appId, 'interview')}
                            disabled={updatingId === appId}
                            className="px-2 py-1 bg-purple-600 text-white rounded text-xs hover:bg-purple-700 disabled:opacity-50 transition-colors"
                          >
                            Interview
                          </button>
                          <button
                            onClick={() => handleStageUpdate(appId, 'offer')}
                            disabled={updatingId === appId}
                            className="px-2 py-1 bg-orange-600 text-white rounded text-xs hover:bg-orange-700 disabled:opacity-50 transition-colors"
                          >
                            Offer
                          </button>
                          <button
                            onClick={() => handleStageUpdate(appId, 'hired')}
                            disabled={updatingId === appId}
                            className="px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 disabled:opacity-50 transition-colors"
                          >
                            Hire
                          </button>
                        </div>

                        {/* Download offer letter */}
                        <button
                          onClick={() => downloadOfferLetter(appId)}
                          className="px-2 py-1 bg-purple-600 text-white rounded text-xs hover:bg-purple-700 transition-colors"
                        >
                          📄 Offer Letter
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
