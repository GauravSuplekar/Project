import React from "react";
import { Link } from "react-router-dom";
import Card from "../../ui/Card";

const ApplicationCard = ({ application }) => {
  return (
    <Link to={`/candidate/application/detail/${application.applicationId}`} className="block">
      <Card hover className="space-y-5 p-6 transition duration-300 hover:ring-2 hover:ring-brand/40">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-lg font-semibold text-white">{application.clientRequirementTitle}</p>
            <p className="mt-1 text-sm text-slate-600">{application.clientRequirementOrganizationName}</p>
          </div>
          <span className="rounded-full bg-white/80 px-3 py-1 text-xs uppercase tracking-[0.3em] text-brand">
            {application.candidateApplicationStatus}
          </span>
        </div>
        <div className="text-sm leading-6 text-slate-600">
          <p>Salary: {application.clientRequirementMinSalary} - {application.clientRequirementMaxSalary} {application.clientRequirementCurrency}</p>
          <p>Location: {application.clientRequirementLocation}</p>
        </div>
      </Card>
    </Link>
  );
};

export default ApplicationCard;
