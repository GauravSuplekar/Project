import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorNotification from "../common/ErrorNotification";
import { getClientDetails } from "../utils/apiFunctions";
import Card from "../ui/Card";

const ClientProfile = () => {
  const [client, setClient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      navigate("/login/client");
      window.location.reload();
      return;
    }

    const fetchClient = async () => {
      try {
        const data = await getClientDetails(localStorage.getItem("username"));
        setClient(data);
      } catch (error) {
        setErrorMessage(error.message || "Unable to load client profile.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchClient();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("username");
    navigate("/");
    window.location.reload();
  };

  const handleNotification = () => {
    setErrorMessage("");
  };

  return (
    <section className="flex flex-col gap-8">
      {errorMessage && (
        <ErrorNotification errorMessage={errorMessage} handleNotification={handleNotification} />
      )}

      <div>
        <h1 className="text-3xl font-bold text-brand-dark">Client Profile</h1>
        <p className="mt-2 text-sm text-slate-600">
          Your client profile information is loaded from the backend.
        </p>
      </div>

      {isLoading ? (
        <div className="mx-auto my-20 flex items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-8 border-t-transparent border-[#0A66C2]" />
        </div>
      ) : client ? (
        <Card className="p-8 bg-white">
          <div className="space-y-4 text-slate-700">
            <p>
              <strong>Name:</strong> {client.name}
            </p>
            <p>
              <strong>Organization:</strong> {client.organizationName}
            </p>
            <p>
              <strong>Contact:</strong> {client.contactNumber}
            </p>
            <p>
              <strong>Email:</strong> {client.email}
            </p>
            <p>
              <strong>Username:</strong> {client.username}
            </p>
          </div>
          <div className="mt-8">
            <button
              onClick={handleLogout}
              className="rounded-2xl bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
            >
              Logout
            </button>
          </div>
        </Card>
      ) : (
        <Card className="p-8">
          <p className="text-slate-700">Client profile not found.</p>
        </Card>
      )}
    </section>
  );
};

export default ClientProfile;
