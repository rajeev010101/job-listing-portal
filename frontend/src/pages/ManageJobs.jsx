import { useEffect, useState } from "react";
import api from "../services/api";

export default function ManageJobs() {

  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);

  const fetchJobs = async () => {
    const res = await api.get("/dashboard/employer");
    setJobs(res.data.jobs || []);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const deleteJob = async (id) => {
    if (!window.confirm("Delete this job?")) return;

    await api.delete(`/jobs/${id}`);
    fetchJobs();
  };

  const updateJob = async (e) => {
    e.preventDefault();

    await api.put(`/jobs/${editingJob._id}`, editingJob);

    setEditingJob(null);
    fetchJobs();
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-black dark:text-white p-10">

      {/* PAGE HEADER */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">
          Employer Dashboard
        </h1>

        <span className="text-gray-500">
          Manage your job postings
        </span>
      </div>


      {/* JOB LIST */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {jobs.map((job) => (

          <div
            key={job._id}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 hover:shadow-xl transition"
          >

            {/* Job Header */}
            <div className="flex items-center gap-4 mb-4">

              {job.companyLogo && (
                <img
                  src={`http://localhost:5000/${job.companyLogo}`}
                  className="w-12 h-12 rounded-lg object-cover"
                />
              )}

              <div>
                <h2 className="text-lg font-semibold">
                  {job.title}
                </h2>

                <p className="text-gray-400 text-sm">
                  {job.companyName}
                </p>
              </div>

            </div>


            {/* Job Info */}
            <div className="text-sm text-gray-500 space-y-1 mb-5">

              <p>📍 {job.location}</p>

              <p>💰 {job.salary}</p>

              <p className="bg-gray-200 dark:bg-gray-800 inline-block px-3 py-1 rounded-full text-xs">
                {job.category}
              </p>

            </div>


            {/* Action Buttons */}
            <div className="flex gap-3">

              <button
                onClick={() => setEditingJob(job)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-sm font-medium"
              >
                Edit
              </button>

              <button
                onClick={() => deleteJob(job._id)}
                className="flex-1 bg-red-600 hover:bg-red-700 py-2 rounded-lg text-sm font-medium"
              >
                Delete
              </button>

            </div>


            <a
              href={`/applicants/${job._id}`}
              className="block mt-4 text-center bg-purple-600 hover:bg-purple-700 py-2 rounded-lg text-sm font-medium"
            >
              View Applicants
            </a>

          </div>

        ))}

      </div>



      {/* EDIT JOB MODAL */}
      {editingJob && (

        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <form
            onSubmit={updateJob}
            className="bg-white dark:bg-gray-900 p-8 rounded-xl w-full max-w-lg shadow-xl"
          >

            <h2 className="text-2xl font-bold mb-6">
              Edit Job
            </h2>

            <input
              type="text"
              value={editingJob.title}
              onChange={(e) =>
                setEditingJob({ ...editingJob, title: e.target.value })
              }
              className="w-full p-3 mb-4 border rounded-lg bg-gray-50 dark:bg-gray-800"
              placeholder="Job Title"
            />

            <input
              type="text"
              value={editingJob.location}
              onChange={(e) =>
                setEditingJob({ ...editingJob, location: e.target.value })
              }
              className="w-full p-3 mb-4 border rounded-lg bg-gray-50 dark:bg-gray-800"
              placeholder="Location"
            />

            <input
              type="text"
              value={editingJob.salary}
              onChange={(e) =>
                setEditingJob({ ...editingJob, salary: e.target.value })
              }
              className="w-full p-3 mb-4 border rounded-lg bg-gray-50 dark:bg-gray-800"
              placeholder="Salary"
            />

            <textarea
              value={editingJob.description}
              onChange={(e) =>
                setEditingJob({ ...editingJob, description: e.target.value })
              }
              rows="4"
              className="w-full p-3 mb-6 border rounded-lg bg-gray-50 dark:bg-gray-800"
              placeholder="Job Description"
            />

            <div className="flex justify-end gap-4">

              <button
                type="button"
                onClick={() => setEditingJob(null)}
                className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg"
              >
                Save Changes
              </button>

            </div>

          </form>

        </div>

      )}

    </div>
  );
}