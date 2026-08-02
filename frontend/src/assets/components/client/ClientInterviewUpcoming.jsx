import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorNotification from "../common/ErrorNotification";
import { getUpcommingInterviews } from "../utils/apiFunctions";
import Card from "../ui/Card";

const ClientInterviewUpcoming = () => {
  const [interviews, setInterviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      navigate("/login/client");
      window.location.reload();
      return;
    }

    const fetchInterviews = async () => {
      setIsLoading(true);
      try {
        const data = await getUpcommingInterviews(localStorage.getItem("username"));
        setInterviews(data || []);
      } catch (error) {
        setErrorMessage(error.message || "Unable to load upcoming interviews.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInterviews();
  }, [navigate]);

  const handleNotification = () => {
    setErrorMessage("");
  };

  return (
    <section className="flex flex-col gap-8">
      {errorMessage && (
        <ErrorNotification errorMessage={errorMessage} handleNotification={handleNotification} />
      )}

      <div>
        <h1 className="text-3xl font-bold text-[#0A66C2]">Upcoming Interviews</h1>
        <p className="mt-2 text-sm text-slate-600">
          Candidates with scheduled interviews for your client requirements.
        </p>
      </div>

      {isLoading ? (
        <div className="mx-auto my-20 flex items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-8 border-t-transparent border-[#0A66C2]" />
        </div>
      ) : interviews.length === 0 ? (
        <div className="rounded-3xl bg-white p-10 shadow-lg">
          <p className="text-lg text-slate-700">No upcoming interviews have been scheduled yet.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {interviews.map((interview) => (
            <Card key={interview.interviewId} className="p-6">
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">{interview.requirementTitle}</h2>
                  <p className="text-sm text-slate-500">Candidate: {interview.candidateName}</p>
                </div>
                <p className="text-sm text-slate-700">Status: {interview.status}</p>
                <p className="text-sm text-slate-700">
                  Interview time: {new Date(interview.interviewTimestamp).toLocaleString()}
                </p>
                <p className="text-sm text-slate-700">Application ID: {interview.applicationId}</p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
};

export default ClientInterviewUpcoming;
