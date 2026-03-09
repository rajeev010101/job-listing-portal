import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Jobs() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const [jobs, setJobs] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [applyingId, setApplyingId] = useState(null);
  const [savedJobs, setSavedJobs] = useState([]);

  const [filters, setFilters] = useState({
    q: "",
    location: "",
    minSalary: "",
    maxSalary: "",
    category: "",
    sort: "newest",
  });

  const limit = 6;

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await api.get("/jobs/search", {
        params: { ...filters, page, limit },
      });

      setJobs(res.data.results);
      setTotal(res.data.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchJobs();
  };

  const handleApply = (jobId) => {
  if (!token) return navigate("/login");

  navigate(`/apply/${jobId}`);
};

  const toggleSave = (jobId) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter((id) => id !== jobId));
    } else {
      setSavedJobs([...savedJobs, jobId]);
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="min-h-screen bg-pink-50 dark:bg-gray-950 text-black dark:text-white p-10 transition-all">

      <h1 className="text-4xl font-bold mb-8">Explore Opportunities</h1>

      {/* FILTER BAR */}
      <form
        onSubmit={handleSearch}
        className="grid md:grid-cols-6 gap-4 mb-10"
      >
        <input
          placeholder="Keyword"
          value={filters.q}
          onChange={(e) =>
            setFilters({ ...filters, q: e.target.value })
          }
          className="p-3 bg-gray-800 rounded"
        />

        <input
          placeholder="Location"
          value={filters.location}
          onChange={(e) =>
            setFilters({ ...filters, location: e.target.value })
          }
          className="p-3 bg-gray-800 rounded"
        />

        <input
          placeholder="Min Salary"
          value={filters.minSalary}
          onChange={(e) =>
            setFilters({ ...filters, minSalary: e.target.value })
          }
          className="p-3 bg-gray-800 rounded"
        />

        <input
          placeholder="Max Salary"
          value={filters.maxSalary}
          onChange={(e) =>
            setFilters({ ...filters, maxSalary: e.target.value })
          }
          className="p-3 bg-gray-800 rounded"
        />

        <select
          value={filters.sort}
          onChange={(e) =>
            setFilters({ ...filters, sort: e.target.value })
          }
          className="p-3 bg-gray-800 rounded"
        >
          <option value="newest">Newest</option>
          <option value="salary-high">Salary High</option>
          <option value="salary-low">Salary Low</option>
        </select>

        <button className="bg-blue-600 rounded">
          Filter
        </button>
      </form>

      {/* JOB CARDS */}
      {loading && <p>Loading...</p>}

      <div className="grid md:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-gray-900 p-6 rounded-2xl border border-gray-800"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {job.title}
              </h2>

              <button onClick={() => toggleSave(job._id)}>
                {savedJobs.includes(job._id) ? "💙" : "🤍"}
              </button>
            </div>

            {job.companyLogo && (
              <img
                src={`http://localhost:5000/${job.companyLogo}`}
                className="w-16 h-16 rounded mb-3"
              />
            )}

            <p className="text-gray-400">
              📍 {job.location}
            </p>
            <p className="text-gray-400">
              💰 {job.salary}
            </p>

            <p className="text-sm text-gray-500 mt-3 mb-4">
              {job.description.slice(0, 100)}...
            </p>

            {role === "jobseeker" ? (
              <button
  onClick={() => handleApply(job._id)}
  className="bg-green-600 hover:bg-green-700 w-full py-2 rounded transition"
>
  Apply Now
</button>
            ) : (
              <button
                onClick={() =>
                  navigate(`/jobs/${job._id}`)
                }
                className="bg-blue-600 w-full py-2 rounded"
              >
                View Details
              </button>
            )}
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-3 mt-10">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 rounded ${
                page === i + 1
                  ? "bg-blue-600"
                  : "bg-gray-800"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}