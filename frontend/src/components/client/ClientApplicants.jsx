import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../ui/Card";
import ErrorNotification from "../common/ErrorNotification";
import {
  getAllRequirementsForTable,
  getApplicantsByRequirement,
  getApplicantDetailForClient,
} from "../utils/apiFunctions";

const ClientApplicants = () => {
  const [requirements, setRequirements] = useState([]);
  const [selectedRequirementId, setSelectedRequirementId] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const requestedRequirementId = searchParams.get("requirementId");

  const fetchRequirements = async () => {
    try {
      const data = await getAllRequirementsForTable(localStorage.getItem("username"));
      setRequirements(data || []);
      if (requestedRequirementId) {
        setSelectedRequirementId(Number(requestedRequirementId));
      } else if (data && data.length > 0) {
        setSelectedRequirementId(data[0].requirementId);
      }
    } catch (error) {
      setErrorMessage(error.message || "Unable to load requirements.");
    }
  };

  const fetchApplicants = async (requirementId) => {
    if (!requirementId) return;
    setIsLoading(true);
    try {
      const data = await getApplicantsByRequirement(requirementId);
      setApplicants(data || []);
      setSelectedApplicant(null);
    } catch (error) {
      setErrorMessage(error.message || "Unable to load applicants.");
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
  }, [navigate, requestedRequirementId]);

  useEffect(() => {
    if (selectedRequirementId) {
      fetchApplicants(selectedRequirementId);
    }
  }, [selectedRequirementId]);

  const handleRequirementChange = (event) => {
    const requirementId = Number(event.target.value);
    setSelectedRequirementId(requirementId);
  };

  const handleApplicantClick = async (applicationId) => {
    try {
      const data = await getApplicantDetailForClient(applicationId);
      setSelectedApplicant(data);
    } catch (error) {
      setErrorMessage(error.message || "Unable to load applicant details.");
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
          <h1 className="text-3xl font-bold text-[#0A66C2]">Applicants</h1>
          <p className="mt-2 text-sm text-slate-600">
            View applicants submitted for your open requirements.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <label htmlFor="requirement-select" className="text-sm font-semibold text-slate-700">
            Requirement:
          </label>
          <select
            id="requirement-select"
            className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800"
            value={selectedRequirementId || ""}
            onChange={handleRequirementChange}
          >
            {requirements.map((requirement) => (
              <option key={requirement.requirementId} value={requirement.requirementId}>
                {requirement.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="mx-auto my-20 flex items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-8 border-t-transparent border-[#0A66C2]" />
        </div>
      ) : applicants.length === 0 ? (
        <div className="rounded-3xl bg-white p-10 shadow-lg">
          <p className="text-lg text-slate-700">
            No applicants have applied for this requirement yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-4">
            {applicants.map((applicant) => (
              <Card key={applicant.applicationId} className="p-5">
                <div className="flex flex-col gap-3">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">
                      {applicant.applicantName}
                    </h2>
                    <p className="text-sm text-slate-500">Status: {applicant.status}</p>
                  </div>
                  <button
                    onClick={() => handleApplicantClick(applicant.applicationId)}
                    className="w-fit rounded-2xl bg-[#0A66C2] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#004182]"
                  >
                    View Details
                  </button>
                </div>
              </Card>
            ))}
          </div>

          {selectedApplicant && (
            <Card className="space-y-4 p-6">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Applicant Details</h2>
                <p className="mt-2 text-sm text-slate-500">
                  Review the selected applicant and the applied requirement.
                </p>
              </div>
              <div className="space-y-3 text-sm text-slate-700">
                <p>
                  <strong>Candidate:</strong> {selectedApplicant.candidateName}
                </p>
                <p>
                  <strong>Application ID:</strong> {selectedApplicant.applicationId}
                </p>
                <p>
                  <strong>Status:</strong> {selectedApplicant.candidateApplicationStatus}
                </p>
                <p>
                  <strong>Requirement:</strong> {selectedApplicant.clientRequirementTitle}
                </p>
                <p>
                  <strong>Salary Range:</strong> {selectedApplicant.clientRequirementMinSalary} - {selectedApplicant.clientRequirementMaxSalary} {selectedApplicant.clientRequirementCurrency}
                </p>
                <p>
                  <strong>Location:</strong> {selectedApplicant.clientRequirementLocation}
                </p>
                {selectedApplicant.interview && (
                  <p>
                    <strong>Interview status:</strong> {selectedApplicant.interview.status}
                  </p>
                )}
              </div>
            </Card>
          )}
        </div>
      )}
    </section>
  );
};

export default ClientApplicants;
