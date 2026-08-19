import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RequirementCard from '../requirement/RequirementCard';
import Paginator from "../../common/Paginator";
import { getAvailableRequirements } from "../../utils/apiFunctions";
import Card from "../../ui/Card";
import ErrorNotification from "../../common/ErrorNotification";

const AvailableRequirement = () => {
  const [availableRequirements, setAvailableRequirements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [currentpage, setCurrentPage] = useState(1);
  const [requirementsPerPage] = useState(6);
  const navigate = useNavigate();

  const calculateTotalPages = (requirementsPerPage, availableRequirements) =>
    Math.ceil(availableRequirements.length / requirementsPerPage);

  const indexOfLastRequirement = currentpage * requirementsPerPage;
  const indexOfFirstRequirement = indexOfLastRequirement - requirementsPerPage;
  const currentRequirements = availableRequirements.slice(indexOfFirstRequirement, indexOfLastRequirement);

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const fetchAvailableRequirements = async () => {
    setIsLoading(true);
    try {
      const data = await getAvailableRequirements(localStorage.getItem("username"));
      setAvailableRequirements(data || []);
    } catch (error) {
      setErrorMessage(error.message || "Unable to load requirements.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const username = localStorage.getItem("username");
    if (!token || !username) {
      navigate("/login/candidate");
      return;
    }
    fetchAvailableRequirements();
  }, [navigate]);

  const handleNotification = () => setErrorMessage("");

  return (
    <section className="space-y-10 pb-10">
      {errorMessage && (
        <ErrorNotification errorMessage={errorMessage} handleNotification={handleNotification} />
      )}

      <Card className="rounded-[2rem] border-white/10 bg-white/70 p-8 shadow-card backdrop-blur-xl">
        <div className="grid gap-8 lg:grid-cols-[1.9fr_1fr] xl:gap-12">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-brand-dark/80">Candidate dashboard</p>
            <h1 className="mt-4 text-4xl font-semibold text-slate-900 md:text-5xl">Discover roles that match your profile</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-700">
              View open requirements from clients, compare salary ranges, and apply directly from a modern recruitment experience.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="p-6 bg-white/20 text-slate-900 shadow-[0_20px_60px_rgba(15,23,42,0.16)] backdrop-blur-xl border border-white/10">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Open roles</p>
              <p className="mt-4 text-3xl font-semibold text-slate-900">{availableRequirements.length}</p>
            </Card>
            <Card className="p-6 bg-white/20 text-slate-900 shadow-[0_20px_60px_rgba(15,23,42,0.16)] backdrop-blur-xl border border-white/10">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Current page</p>
              <p className="mt-4 text-3xl font-semibold text-slate-900">{currentpage}</p>
            </Card>
          </div>
        </div>
      </Card>

      <div className="space-y-6">
        {isLoading ? (
          <div className="mx-auto my-20 flex items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-8 border-t-transparent border-brand" />
          </div>
        ) : currentRequirements.length === 0 ? (
          <Card className="p-10 text-center text-slate-600">
            No open requirements are available right now. Check back soon or update your profile to improve matches.
          </Card>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {currentRequirements.map((requirement) => (
              <RequirementCard requirement={requirement} key={requirement.requirementId} />
            ))}
          </div>
        )}
      </div>

      <Paginator
        currentPage={currentpage}
        totalPages={calculateTotalPages(requirementsPerPage, availableRequirements)}
        onPageChange={handlePaginationClick}
      />
    </section>
  );
};

export default AvailableRequirement;