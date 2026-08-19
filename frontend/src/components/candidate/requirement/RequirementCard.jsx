import { Link } from "react-router-dom";
import Card from "../../ui/Card";

const RequirementCard = ({ requirement }) => {
  return (
    <Link to={`/candidate/requirement/detail/${requirement.requirementId}`} className="block">
      <Card hover className="space-y-5 p-6 transition duration-300 hover:ring-2 hover:ring-brand/40 bg-slate-50">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xl font-semibold text-slate-900 sm:text-2xl">{requirement.title}</p>
            <p className="mt-2 text-sm uppercase tracking-[0.35em] text-slate-500">{requirement.location}</p>
          </div>
          <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-brand-dark">
            Open
          </span>
        </div>
        <div className="space-y-2 text-sm leading-6 text-slate-600">
          <p className="text-slate-600">Company: {requirement.organizationName}</p>
          <p className="text-slate-600">Salary: {requirement.minSalary} - {requirement.maxSalary} {requirement.currency}</p>
        </div>
      </Card>
    </Link>
  );
};

export default RequirementCard;