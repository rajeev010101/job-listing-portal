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
    <div className="min-h-screen bg-pink-50 dark:bg-gray-950 text-black dark:text-white p-10 transition-all">

      <h1 className="text-3xl font-bold mb-8">Manage Jobs</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-gray-900 p-6 rounded-xl border border-gray-800"
          >
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-400 mt-2">{job.location}</p>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => setEditingJob(job)}
                className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
              >
                Edit
              </button>

              <button
                onClick={() => deleteJob(job._id)}
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingJob && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <form
            onSubmit={updateJob}
            className="bg-gray-900 p-8 rounded-xl w-full max-w-lg border border-gray-800"
          >
            <h2 className="text-2xl font-bold mb-6">Edit Job</h2>

            <input
              type="text"
              value={editingJob.title}
              onChange={(e) =>
                setEditingJob({ ...editingJob, title: e.target.value })
              }
              className="w-full p-3 mb-4 bg-gray-800 rounded"
            />

            <input
              type="text"
              value={editingJob.location}
              onChange={(e) =>
                setEditingJob({ ...editingJob, location: e.target.value })
              }
              className="w-full p-3 mb-4 bg-gray-800 rounded"
            />

            <input
              type="text"
              value={editingJob.salary}
              onChange={(e) =>
                setEditingJob({ ...editingJob, salary: e.target.value })
              }
              className="w-full p-3 mb-4 bg-gray-800 rounded"
            />

            <textarea
              value={editingJob.description}
              onChange={(e) =>
                setEditingJob({ ...editingJob, description: e.target.value })
              }
              className="w-full p-3 mb-6 bg-gray-800 rounded"
              rows="4"
            />

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setEditingJob(null)}
                className="bg-gray-700 px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

     {jobs.map((job) => (
  <div key={job._id} className="...">
    
    <h2>{job.title}</h2>

    <div className="flex gap-4 mt-4">
      
      <button onClick={() => setEditingJob(job)}>Edit</button>

      <button onClick={() => deleteJob(job._id)}>Delete</button>

      <a
        href={`/applicants/${job._id}`}
        className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700"
      >
        View Applicants
      </a>

    </div>

  </div>
))}



    </div>
  );
}
