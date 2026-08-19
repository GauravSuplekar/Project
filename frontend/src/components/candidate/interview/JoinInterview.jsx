import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUpcommingInterviewsForCandidate } from "../../utils/apiFunctions";
import Paginator from "../../common/Paginator";
import JoinInterviewCard from "../interview/JoinInterviewCard";
import Card from "../../ui/Card";
import ErrorNotification from "../../common/ErrorNotification";

const JoinInterview = () => {
  const [allInterviews, setAllInterviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [currentpage, setCurrentPage] = useState(1);
  const [interviewsPerPage] = useState(6);
  const navigate = useNavigate();

  const calculateTotalPages = (interviewsPerPage, allInterviews) =>
    Math.ceil(allInterviews.length / interviewsPerPage);

  const indexOfLastInterviews = currentpage * interviewsPerPage;
  const indexOfFirstInterviews = indexOfLastInterviews - interviewsPerPage;
  const currentInterviews = allInterviews.slice(indexOfFirstInterviews, indexOfLastInterviews);

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const fetchUpcommingInterviews = async () => {
    setIsLoading(true);
    try {
      const data = await getUpcommingInterviewsForCandidate(localStorage.getItem("username"));
      setAllInterviews(data || []);
    } catch (error) {
      setErrorMessage(error.message || "Unable to load interviews.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      navigate("/login/candidate");
      window.location.reload();
      return;
    }
    fetchUpcommingInterviews();
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
            <p className="text-sm uppercase tracking-[0.35em] text-brand/80">Interview schedule</p>
            <h1 className="mt-4 text-4xl font-semibold text-slate-900 md:text-5xl">Upcoming interviews</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-700">
              Monitor your next interview slots and join sessions directly from the dashboard.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="p-6 bg-white/80 text-slate-900">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Scheduled</p>
              <p className="mt-4 text-3xl font-semibold text-slate-900">{allInterviews.length}</p>
            </Card>
            <Card className="p-6 bg-white/80 text-slate-900">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Next session</p>
              <p className="mt-4 text-3xl font-semibold text-slate-900">
                {allInterviews[0]?.status || 'None'}
              </p>
            </Card>
          </div>
        </div>
      </Card>

      <div className="space-y-6">
        {isLoading ? (
          <div className="mx-auto my-20 flex items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-8 border-t-transparent border-brand" />
          </div>
        ) : currentInterviews.length === 0 ? (
          <Card className="p-10 text-center text-slate-600">
            No upcoming interviews are scheduled yet. Check your applications for interview requests.
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {currentInterviews.map((interview) => (
              <JoinInterviewCard interview={interview} key={interview.interviewId} />
            ))}
          </div>
        )}
      </div>

      <Paginator
        currentPage={currentpage}
        totalPages={calculateTotalPages(interviewsPerPage, allInterviews)}
        onPageChange={handlePaginationClick}
      />
    </section>
  );
};

export default JoinInterview;