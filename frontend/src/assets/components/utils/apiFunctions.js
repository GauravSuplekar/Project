import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "https://recruitment-system-backend.onrender.com";
export const api = axios.create({
    baseURL: apiBaseUrl
});

// Attach the JWT token automatically to every request if available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("jwtToken");
        config.headers = config.headers || {};
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            localStorage.removeItem("jwtToken");
            localStorage.removeItem("username");
            localStorage.removeItem("role");
        }
        return Promise.reject(error);
    }
);

// Function to get the JWT token from local storage
const getToken = () => {
    return localStorage.getItem("jwtToken");
};

const clearAuth = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
};

/* This function login a registered user */
export const loginCandidate = async (user) => {
    try {
        const response = await api.post("/auth/login/candidate", user);
        return response.data;
    } catch (error) {
        const message = error.response?.data || error.message || "Login failed.";
        throw new Error(typeof message === "string" ? message : JSON.stringify(message));
    }
};

/* This function login a registered user */
export const loginClient = async (user) => {
    try {
        const response = await api.post("/auth/login/client", user);
        return response.data;
    } catch (error) {
        const message = error.response?.data || error.message || "Login failed.";
        throw new Error(typeof message === "string" ? message : JSON.stringify(message));
    }
};

export const loginAdmin = async (user) => {
    try {
        const response = await api.post("/auth/login/admin", user);
        return response.data;
    } catch (error) {
        const message = error.response?.data || error.message || "Login failed.";
        throw new Error(typeof message === "string" ? message : JSON.stringify(message));
    }
};

export const registerCandidate = async (candidateData) => {
    try {
        const response = await api.post("/auth/register/candidate", candidateData);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            // Extract and return the specific error message from the response body
            throw new Error(error.response.data);
        } else {
            console.error("Registration failed:", error);
            throw error;
        }
    }
};


export const registerClient = async (clientData) => {
    try {
        const response = await api.post("/auth/register/client", clientData);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            // Extract and return the specific error message from the response body
            throw new Error(error.response.data);
        } else {
            console.error("Registration failed:", error);
            throw error;
        }
    }
};


// Function to get the user profile, using the saved JWT token for authorization
export const getUserProfile = async () => {
    try {
        const token = getToken();
        const response = await api.get("/user/profile", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch user profile:", error);
        throw error;
    }
};


export const addRequirement = async (username, newRequirement) => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error("You must be signed in to create a requirement.");
        }
        const formData = new FormData();
        formData.append("requirement", new Blob([JSON.stringify(newRequirement)], { type: "application/json" }));
        if (newRequirement.requirementImageFile) {
            formData.append("requirementImage", newRequirement.requirementImageFile);
        }
        const response = await api.post(`/requirements/${username}`, formData);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Failed to add requirement:", error.response.data);
            throw new Error(error.response.data?.detail || error.response.data || error.message);
        }
        console.error("Failed to add requirement:", error);
        throw error;
    }
};

export async function deleteRequirementById(requirementId){
    try {
        const token = getToken();
        const response = await api.delete(`/requirements/${requirementId}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.data !== true) {
            throw new Error("Unable to delete requirement.");
        }
        return response.data;
    } catch (error) {
        if (error.response?.data) {
            throw new Error(error.response.data?.detail || error.response.data || error.message);
        }
        throw new Error("Error: Deleting requirement");
    }
}


export async function getAllRequirementsForTable(username){
    try {
        const token = getToken();
        const response = await api.get(`/requirements/table/${username}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error : Fetching requirements")
    }
}

export async function getAvailableRequirements(username){
    try {
        const token = getToken();
        const response = await api.get(`/requirements/available/${username}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error : Fetching requirements")
    }
}

export async function getRequirementDetail(requirementId){
    try {
        const token = getToken();
        const response = await api.get(`/requirements/detail/${requirementId}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error : Fetching requirement")
    }
}

export const applyToRequirement = async (username, requirementId) => {
    const token = getToken();
    if (!token) {
        throw new Error('Candidate is not authenticated. Please log in again.');
    }
    try {
        console.debug('applyToRequirement: calling API', { username, requirementId });
        const response = await api.post(`/applications/${username}?requirementId=${requirementId}`);
        console.debug('applyToRequirement: response', response);
        return response.data;
    } catch (error) {
        console.error('applyToRequirement error', error);
        if (error.response && error.response.data) {
            const resp = error.response.data;
            const msg = typeof resp === 'string'
                ? resp
                : (resp.detail || resp.message || resp.error || JSON.stringify(resp));
            throw new Error(msg);
        }
        throw new Error(error.message || 'Failed to apply to requirement');
    }
};

export async function getCandidateDetails(username){
    try {
        const token = getToken();
        const response = await api.get(`/candidate/${username}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error : Fetching details")
    }
}

export async function updateCandidateProfile(username, name, contactNumber, resume, medicalReport){
    const formData = new FormData();
    formData.append("name", name);
    formData.append("contactNumber", contactNumber);
    if (resume) {
        formData.append("resume", resume);
    }
    if (medicalReport) {
        formData.append("medicalReport", medicalReport);
    }
    try {
        const token = getToken();
        const response = await api.put(`/candidate/${username}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    }
    catch (error) {
        throw new Error("Error : Updating profile")
    }
}

export async function getAppliedRequirements(username){
    try {
        const token = getToken();
        const response = await api.get(`/requirements/applied/${username}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error : Fetching requirements")
    }
}


export async function getAllApplication(username){
    try {
        const token = getToken();
        const response = await api.get(`/applications/${username}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error : Fetching applications")
    }
}

export async function getApplicationDetail(applicationId){
    try {
        const token = getToken();
        const response = await api.get(`/applications/detail/${applicationId}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error : Fetching application detail")
    }
}

export async function withdrawApplication(applicationId){
    try {
        const token = getToken();
        const response = await api.put(`/applications/withdraw/${applicationId}`,{},{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error : Withdrawing application")
    }
}

export async function acceptOffer(applicationId){
    try {
        const token = getToken();
        const response = await api.put(`/applications/accept/${applicationId}`,{},{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error : Withdrawing application")
    }
}

export async function rejectOffer(applicationId){
    try {
        const token = getToken();
        const response = await api.put(`/applications/reject/${applicationId}`,{},{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error : Rejecting offer")
    }
}

export async function updateAppliedStatus(applicationId){
    try {
        const token = getToken();
        const response = await api.put(`/applications/status/underreview/${applicationId}`,{},{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error : updating status")
    }
}

export async function getApplicantsByRequirement(requirementId){
    try {
        const token = getToken();
        const response = await api.get(`/applications/requirements/${requirementId}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error : Fetching applications")
    }
}

export async function rejectApplicant(applicationId){
    try {
        const token = getToken();
        const response = await api.put(`/applications/reject/applicant/${applicationId}`,{},{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error : Rejecting application")
    }
}

export async function candidateFit(applicationId){
    try {
        const token = getToken();
        const response = await api.put(`/applications/fit/${applicationId}`,{},{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error : Rejecting application")
    }
}

export async function candidateUnfit(applicationId){
    try {
        const token = getToken();
        const response = await api.put(`/applications/unfit/${applicationId}`,{},{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error : Rejecting application")
    }
}

export async function getApplicantDetailForClient(applicationId){
    try {
        const token = getToken();
        const response = await api.get(`/applications/detail/client/${applicationId}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error : Fetching application detail")
    }
}

export const scheduleInterview = async (applicationId, time) => {
    try {
        const token = getToken();
        const response = await api.post(`/interview/schedule/${applicationId}?time=${time}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Failed to add interview:", error);
        throw error;
    }
};

export async function getUpcommingInterviews(username){
    try {
        const token = getToken();
        const response = await api.get(`/interview/upcomming/${username}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error : Fetching interviews")
    }
}

export async function postMeetingId(interviewId, meetingId){
    try {
        const token = getToken();
        const response = await api.put(`/interview/meetingId/${interviewId}?meetingId=${meetingId}`,{}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        console.log("Error : Posting meetingId")
        throw new Error("Error : Posting meetingId")
    }
}

export async function getUpcommingInterviewsForCandidate(username){
    try {
        const token = getToken();
        const response = await api.get(`/interview/upcomming/candidate/${username}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error : Fetching interviews")
    }
}

export async function updateInterviewStatusToOngoing(interviewId){
    try {
        const token = getToken();
        const response = await api.put(`/interview/update/status/ongoing/${interviewId}`,{}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        console.log("Error : Updating status")
        throw new Error("Error : Updating status")
    }
}

export async function updateInterStatusToCompleted(interviewId){
    try {
        const token = getToken();
        const response = await api.put(`/interview/update/status/completed/${interviewId}`,{}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        console.log("Error : Updating status")
        throw new Error("Error : Updating status")
    }
}

export async function uploadTicket(applicationId,ticket){
    const formData = new FormData()
    formData.append("ticketFile", ticket)
    try{
        const token = getToken();
        const response = await api.put(`/applications/uploadTicket/${applicationId}`,formData,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response
    }
    catch (error){
        throw new Error("Error : Uploading ticket")
    }
}

export async function uploadVisa(applicationId,visa){
    const formData = new FormData()
    formData.append("visaFile", visa)
    try{
        const token = getToken();
        const response = await api.put(`/applications/uploadVisa/${applicationId}`,formData,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response
    }
    catch (error){
        throw new Error("Error : Uploading visa")
    }
}

export async function pay(applicationId){
    try{
        const token = getToken();
        const response = await api.post(`/payment/${applicationId}`,{},{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response
    }
    catch (error){
        throw new Error("Error : Payment failed")
    }
}

export async function getSelectedApplicants(username){
    try {
        const token = getToken();
        const response = await api.get(`/client/selected/applicants/${username}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error : Fetching applications")
    }
}

export async function getClientDetails(username){
    try {
        const token = getToken();
        const response = await api.get(`/client/${username}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error : Fetching details")
    }
}

export async function getAllClientsForAdmin(){
    try {
        const token = getToken();
        const response = await api.get(`/client/all`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error : Fetching client")
    }
}

export async function getResetLink(email){
    try {
        const response = await api.post(`/auth/forgot-password/${email}`, {})
        return response.data
    } catch (error) {
        throw new Error("Error sending reset link. Please try again.")
    }
}

export async function updatePassword(token, newPassword){
    try {
        const response = await api.post(`/auth/reset-password?token=${token}&newPassword=${newPassword}`, {})
        return response.data
    } catch (error) {
        throw new Error("Error sending reset link. Please try again.")
    }
}

export async function deleteClientById(clientId){
    try {
        const token = getToken();
        const response = await api.delete(`/client/${clientId}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error : Deleting client")
    }
}

export async function getAllCandidatesForAdmin(){
    try {
        const token = getToken();
        const response = await api.get(`/candidate/all`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error : Fetching candidates")
    }
}

export async function deleteCandidateById(candidateId){
    try {
        const token = getToken();
        const response = await api.delete(`/candidate/${candidateId}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error : Deleting candidate")
    }
}

export async function getAllRequirements(username){
    try {
        const token = getToken();
        const response = await api.get(`/requirements/all`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error : Fetching requirements")
    }
}

export async function getAdminDetails(username){
    try {
        const token = getToken();
        const response = await api.get(`/auth/admin`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw new Error("Error : Fetching details")
    }
}