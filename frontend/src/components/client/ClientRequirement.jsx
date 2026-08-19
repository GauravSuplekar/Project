import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../ui/Card";
import { deleteRequirementById, getAllRequirementsForTable } from "../utils/apiFunctions";
import ErrorNotification from "../common/ErrorNotification";

const ClientRequirement = () => {
  const [requirements, setRequirements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const fetchRequirements = async () => {
    setIsLoading(true);
    try {
      const data = await getAllRequirementsForTable(localStorage.getItem("username"));
      setRequirements(data || []);
    } catch (error) {
      setErrorMessage(error.message || "Unable to load your requirements.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      navigate("/login/client");
      window.location.reload();
      return;
    }
    fetchRequirements();
  }, [navigate]);

  const handleDelete = async (requirementId) => {
    try {
      await deleteRequirementById(requirementId);
      fetchRequirements();
    } catch (error) {
      setErrorMessage(error.message || "Could not delete requirement.");
    }
  };

  const handleNotification = () => {
    setErrorMessage("");
  };

  return (
    <section className="flex flex-col gap-8">
      {errorMessage && (
        <ErrorNotification errorMessage={errorMessage} handleNotification={handleNotification} />
      )}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-brand-dark">My Requirements</h1>
          <p className="mt-2 text-sm text-slate-600">
            Review and manage the requirements you have posted for candidates.
          </p>
        </div>
        <Link
          to="/client/add/requirement"
          className="inline-flex items-center justify-center rounded-2xl bg-brand px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
        >
          Add Requirement
        </Link>
      </div>

      {isLoading ? (
        <div className="mx-auto my-20 flex items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-8 border-t-transparent border-[#0A66C2]" />
        </div>
      ) : requirements.length === 0 ? (
        <Card className="p-10 bg-white shadow-sm">
          <p className="text-lg text-slate-700">
            You have not posted any requirements yet. Create one to start receiving applications.
          </p>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {requirements.map((requirement) => (
            <Card key={requirement.requirementId} className="p-6">
              <div className="flex flex-col gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">{requirement.title}</h2>
                  <p className="text-sm text-slate-500">Status: {requirement.status}</p>
                </div>
                <div className="space-y-2 text-sm text-slate-700">
                  <p>Location: {requirement.location}</p>
                  <p>
                    Salary: {requirement.minSalary} - {requirement.maxSalary} {requirement.currency}
                  </p>
                  <p>Applicants: {requirement.numberOfApplicants}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    to={`/client/applicants?requirementId=${requirement.requirementId}`}
                    className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
                  >
                    View Applicants
                  </Link>
                  <button
                    onClick={() => handleDelete(requirement.requirementId)}
                    className="rounded-2xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
};

export default ClientRequirement;
