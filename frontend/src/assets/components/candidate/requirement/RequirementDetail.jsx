import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ErrorNotification from "../../common/ErrorNotification";
import SuccessNotification from "../../common/SuccessNotification";
import { applyToRequirement, getRequirementDetail } from "../../utils/apiFunctions";

const RequirementDetail = () => {
    const [requirement, setRequirement] = useState();
    const {requirementId} = useParams();
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const fetchRequirementDetail = useCallback(async () => {
        setIsLoading(true);
        try {
          const data = await getRequirementDetail(requirementId);
          setRequirement(data);
        } catch (error) {
          setErrorMessage(error?.message || 'Failed to load requirement');
        } finally {
          setIsLoading(false);
        }
      }, [requirementId]);

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        const username = localStorage.getItem("username");
        const role = localStorage.getItem("role");
        if (!token || !username || role !== "candidate") {
            localStorage.removeItem("jwtToken");
            localStorage.removeItem("username");
            localStorage.removeItem("role");
            navigate("/login/candidate");
            return;
        }
        fetchRequirementDetail();
    }, [navigate, fetchRequirementDetail]);

    const handleNotification = () => {
        setErrorMessage("")
    }
    
    const handleOnClick = async () => {
      const role = localStorage.getItem("role");
      if (role !== "candidate") {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        setErrorMessage("Please log in as a candidate before applying.");
        setTimeout(() => setErrorMessage(""), 5000);
        navigate("/login/candidate");
        return;
      }
      setIsSubmitting(true);
      try {
        await applyToRequirement(localStorage.getItem("username"), requirement?.requirementId);
        setSuccessMessage("Applied successfully");
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/candidate/requirement");
          // ensure the requirements list refreshes to reflect this application
          window.location.reload();
        }, 2000);
      } catch (error) {
        const msg = error?.response?.data?.detail || error?.response?.data?.message || error?.message || 'Error applying to requirement';
        setErrorMessage(msg);
        setTimeout(() => setErrorMessage(""), 5000);
      } finally {
        setIsSubmitting(false);
      }
    }

    return (
        <>
          
          {errorMessage && (
            <ErrorNotification errorMessage={errorMessage}
            handleNotification={handleNotification}/>
          )}
          {successMessage && (
            <SuccessNotification successMessage={successMessage}
            handleNotification={handleNotification}/>
          )}
          
          <div className="flex flex-col mx-auto">
            <h2 className="font-CinzelRegular mx-auto text-3xl font-bold text-[#0A66C2] size-fit">
              Requirement Details
            </h2>
    
            {isLoading ? (
              <div className="size-fit mx-auto transform translate-x-1/2 translate-y-1/2 ">
                <div className="border-t-transparent border-solid animate-spin  rounded-full border-[#0A66C2] border-8 h-10 w-10"></div>
              </div>
            ) : (
              <>
              {requirement && requirement.status?.toUpperCase() === "OPEN" ? (
                <div className="m-5 font-LakesNeueRegular overflow-hidden rounded-lg border border-gray-200 shadow-md pb-1">
                  <div className="p-5">
                      <h3 className="text-xl font-semibold">Job Title : {requirement.title}</h3>
                      {requirement.imageUrl && (
                        <img
                          src={requirement.imageUrl}
                          alt={requirement.title}
                          className="my-5 max-w-full h-auto rounded-3xl object-contain"
                        />
                      )}
                      <p className="my-5"><strong>Client Name:</strong> {requirement.clientName}</p>
                      <p className="my-5"><strong>Client Organization:</strong> {requirement.clientOrganizationName}</p>
                      <p className="my-5"><strong>Description:</strong> {requirement.description}</p>
                      <p className="my-5"><strong>Date Posted:</strong> {requirement.datePosted}</p>
                      <p className="my-5"><strong>Valid Till:</strong> {requirement.validTill}</p>
                      <p className="my-5"><strong>Experience Required:</strong> {requirement.experienceRequired ?? "N/A"} years</p>
                      <p className="my-5"><strong>Commitment Period:</strong> {requirement.commitmentPeriod || "N/A"}</p>
                      <p className="my-5"><strong>Skills Required:</strong> {requirement.skillsRequired || "N/A"}</p>
                      <p className="my-5"><strong>Salary Range:</strong> {requirement.minSalary} - {requirement.maxSalary} {requirement.currency}</p>
                      <p className="my-5"><strong>Location:</strong> {requirement.location}</p>
                  </div>
                  <div  className="flex justify-center my-4">
                        <div>
                        <div>
                            <button
                            onClick={() => navigate(-1)}
                                className=" bg-[#0A66C2] mr-5 rounded-lg hover:bg-[#004182] focus:bg-[#0A66C2]
                                    text-white font-bold py-2 px-4  focus:outline-none mx-auto
                                    focus:shadow-outline">Back
                            </button>
                        </div>
                        </div>
                        <div>
                        <button type="button" 
                        onClick={handleOnClick}
                        disabled={isSubmitting}
                        className=" bg-[#0A66C2] rounded-lg hover:bg-[#004182] focus:bg-[#0A66C2]
                          text-white font-bold py-2 px-4  focus:outline-none mx-auto
                          focus:shadow-outline">Apply</button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="m-5 font-LakesNeueRegular overflow-hidden rounded-lg border border-gray-200 shadow-md pb-1">
                  Requirement is not Open
                </div>
              )}
            </>
            )}
          </div>
        </>
      );
}

export default RequirementDetail;