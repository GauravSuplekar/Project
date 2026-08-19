import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addRequirement } from "../utils/apiFunctions";
import ErrorNotification from "../common/ErrorNotification";

const AddRequirement = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    minSalary: "",
    maxSalary: "",
    currency: "USD",
    location: "",
    validTill: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      navigate("/login/client");
    }
  }, [navigate]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    const payload = {
      title: formData.title,
      description: formData.description,
      minSalary: Number(formData.minSalary),
      maxSalary: Number(formData.maxSalary),
      currency: formData.currency,
      location: formData.location,
      validTill: formData.validTill,
      datePosted: new Date().toISOString().slice(0, 10),
      status: "OPEN",
    };

    try {
      await addRequirement(localStorage.getItem("username"), payload);
      setSuccessMessage("Requirement created successfully.");
      navigate("/client/requirement");
      window.location.reload();
    } catch (error) {
      setErrorMessage(error.message || "Failed to create requirement.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotification = () => {
    setErrorMessage("");
    setSuccessMessage("");
  };

  return (
    <section className="max-w-3xl rounded-3xl bg-white p-8 shadow-lg">
      {errorMessage && (
        <ErrorNotification errorMessage={errorMessage} handleNotification={handleNotification} />
      )}

      <h1 className="text-3xl font-bold text-[#0A66C2]">Add New Requirement</h1>
      <p className="mt-2 text-sm text-slate-600">
        Create a client requirement and publish it for candidate applications.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-slate-700">
            Title
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700">
            Location
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
            />
          </label>
        </div>

        <label className="space-y-2 text-sm font-medium text-slate-700">
          Description
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows="5"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
          />
        </label>

        <div className="grid gap-6 sm:grid-cols-3">
          <label className="space-y-2 text-sm font-medium text-slate-700">
            Min Salary
            <input
              type="number"
              name="minSalary"
              value={formData.minSalary}
              onChange={handleInputChange}
              required
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700">
            Max Salary
            <input
              type="number"
              name="maxSalary"
              value={formData.maxSalary}
              onChange={handleInputChange}
              required
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700">
            Currency
            <select
              name="currency"
              value={formData.currency}
              onChange={handleInputChange}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="INR">INR</option>
              <option value="AED">AED</option>
            </select>
          </label>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-slate-700">
            Valid Till
            <input
              type="date"
              name="validTill"
              value={formData.validTill}
              onChange={handleInputChange}
              required
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
            />
          </label>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-2xl bg-[#0A66C2] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#004182] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Saving…" : "Create Requirement"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddRequirement;
