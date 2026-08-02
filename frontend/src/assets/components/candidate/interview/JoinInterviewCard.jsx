import React from "react";
import moment from "moment";
import Card from "../../ui/Card";

const RequirementInterviewCard = ({ interview }) => {
  const startInterview = () => {
    window.open(`/interview/join/?roomID=${interview.meetingId}`);
  };

  const interviewStatusText = () => {
    if (!interview.interviewTimestamp) return 'Not Scheduled';
    switch (interview.status) {
      case 'SCHEDULED':
        return `Scheduled for ${moment(interview.interviewTimestamp).format('MMMM Do YYYY, h:mm A')}`;
      case 'COMPLETED':
        return 'Completed';
      case 'CANCELLED':
        return 'Cancelled';
      case 'ONGOING':
        return 'Ongoing';
      default:
        return 'Status Unknown';
    }
  };

  return (
    <Card hover className="space-y-5 p-6 transition duration-300 hover:ring-2 hover:ring-brand/40">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xl font-semibold text-white">{interview.requirementTitle}</p>
          <p className="mt-1 text-sm text-slate-600">{interview.organizationName}</p>
        </div>
        <span className="rounded-full bg-white/80 px-3 py-1 text-xs uppercase tracking-[0.3em] text-brand">
          {interview.status}
        </span>
      </div>

      <div className="space-y-2 text-sm leading-6 text-slate-600">
        <p>Applicant ID: {interview.applicationId}</p>
        <p>{interviewStatusText()}</p>
      </div>

      {interview.status === "ONGOING" && (
        <button
          onClick={startInterview}
          className="rounded-2xl bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark"
        >
          Join Interview
        </button>
      )}
    </Card>
  );
};

export default RequirementInterviewCard;