import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addRequirement } from "../utils/apiFunctions";
import ErrorNotification from "../common/ErrorNotification";
import SuccessNotification from "../common/SuccessNotification";

const AddRequirement = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    minSalary: "",
    maxSalary: "",
    currency: "USD",
    location: "",
    validTill: "",
    experienceRequired: "",
    commitmentPeriod: "",
    skillsRequired: "",
    requirementImageFile: null,
    requirementImagePreview: null,
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

  const handleImageChange = (event) => {
    const file = event.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      requirementImageFile: file,
      requirementImagePreview: file ? URL.createObjectURL(file) : null,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    const token = localStorage.getItem("jwtToken");
    const username = localStorage.getItem("username");
    if (!token || !username) {
      setErrorMessage("You must be logged in as a client to create a requirement.");
      setIsLoading(false);
      return;
    }

    const payload = {
      title: formData.title,
      description: formData.description,
      minSalary: Number(formData.minSalary),
      maxSalary: Number(formData.maxSalary),
      currency: formData.currency,
      location: formData.location,
      validTill: formData.validTill,
      experienceRequired: formData.experienceRequired ? Number(formData.experienceRequired) : null,
      commitmentPeriod: formData.commitmentPeriod,
      skillsRequired: formData.skillsRequired,
      requirementImageFile: formData.requirementImageFile,
    };

    try {
      await addRequirement(username, payload);
      setSuccessMessage("Requirement created successfully.");
      setFormData({
        title: "",
        description: "",
        minSalary: "",
        maxSalary: "",
        currency: "USD",
        location: "",
        validTill: "",
        experienceRequired: "",
        commitmentPeriod: "",
        skillsRequired: "",
        requirementImageFile: null,
        requirementImagePreview: null,
      });
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
      {successMessage && (
        <SuccessNotification successMessage={successMessage} handleNotification={handleNotification} />
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
        <div className="grid gap-6 sm:grid-cols-3">
          <label className="space-y-2 text-sm font-medium text-slate-700">
            Experience Required (years)
            <input
              type="number"
              name="experienceRequired"
              min="0"
              placeholder="e.g. 3"
              value={formData.experienceRequired}
              onChange={handleInputChange}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700">
            Commitment Period
            <input
              type="text"
              name="commitmentPeriod"
              value={formData.commitmentPeriod}
              onChange={handleInputChange}
              placeholder="e.g. 6 months"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700">
            Skills Required
            <input
              type="text"
              name="skillsRequired"
              value={formData.skillsRequired}
              onChange={handleInputChange}
              placeholder="e.g. Java, Spring Boot, SQL"
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

        <label className="space-y-2 text-sm font-medium text-slate-700">
          Requirement Image (optional)
          <input
            type="file"
            name="requirementImage"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
          />
        </label>

        {formData.requirementImagePreview && (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-700">Preview</p>
            <img
              src={formData.requirementImagePreview}
              alt="Requirement preview"
              className="mt-3 max-h-52 w-full rounded-2xl object-cover"
            />
          </div>
        )}

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
