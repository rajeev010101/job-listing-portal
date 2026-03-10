import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CreateJob() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    companyName: "",
    description: "",
    qualifications: "",
    responsibilities: "",
    location: "",
    salary: "",
    salaryNumber: "",
    category: "",
    type: "Full-time",
  });

  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {

      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      if (logo) {
        formData.append("logo", logo);
      }

      await api.post("/jobs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Job created successfully!");
      navigate("/manage-jobs");

    } catch (err) {
      setError(err.response?.data?.error || "Failed to create job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 dark:bg-gray-950 text-black dark:text-white p-10 transition-all">

      <div className="max-w-4xl mx-auto bg-gray-100 dark:bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800">

        <h1 className="text-3xl font-bold mb-8">Create New Job</h1>

        {error && (
          <div className="bg-red-500/20 text-red-500 p-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-6">

          {/* Company Name */}
          <input
            name="companyName"
            placeholder="Company Name"
            value={form.companyName}
            onChange={handleChange}
            required
            className="p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
          />

          {/* Company Logo */}
          <input
            type="file"
            onChange={(e) => setLogo(e.target.files[0])}
            className="p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
          />

          {/* Title */}
          <input
            name="title"
            placeholder="Job Title"
            value={form.title}
            onChange={handleChange}
            required
            className="p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
          />

          {/* Location */}
          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            required
            className="p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
          />

          {/* Salary */}
          <input
            name="salary"
            placeholder="Salary (e.g. 10 LPA)"
            value={form.salary}
            onChange={handleChange}
            required
            className="p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
          />

          {/* Salary Number */}
          <input
            name="salaryNumber"
            type="number"
            placeholder="Salary Number (for filtering)"
            value={form.salaryNumber}
            onChange={handleChange}
            className="p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
          />

          {/* Category */}
          <input
            name="category"
            placeholder="Category (e.g. IT, Marketing)"
            value={form.category}
            onChange={handleChange}
            className="p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
          />

          {/* Job Type */}
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            required
            className="p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Remote">Remote</option>
            <option value="Internship">Internship</option>
          </select>

          {/* Description */}
          <textarea
            name="description"
            placeholder="Job Description"
            value={form.description}
            onChange={handleChange}
            required
            rows="4"
            className="p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
          />

          {/* Qualifications */}
          <textarea
            name="qualifications"
            placeholder="Qualifications"
            value={form.qualifications}
            onChange={handleChange}
            required
            rows="3"
            className="p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
          />

          {/* Responsibilities */}
          <textarea
            name="responsibilities"
            placeholder="Responsibilities"
            value={form.responsibilities}
            onChange={handleChange}
            required
            rows="3"
            className="p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Job"}
          </button>

        </form>
      </div>
    </div>
  );
}