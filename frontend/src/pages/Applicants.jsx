import { useEffect, useState } from "react";
import api from "../services/api";
import { useParams } from "react-router-dom";

export default function Applicants() {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);

  const fetchApplicants = async () => {
    const res = await api.get(`/applications/job/${jobId}`);
    setApplications(res.data);
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const updateStatus = async (appId, status) => {
    await api.put(`/applications/${appId}/status`, { status });
    fetchApplicants();
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-10">

      <h1 className="text-3xl font-bold mb-8">Applicants</h1>

      {applications.length === 0 && (
        <p className="text-gray-500">No applicants yet.</p>
      )}

      <div className="space-y-6">
        {applications.map((app) => (
          <div
            key={app._id}
            className="bg-gray-900 p-6 rounded-xl border border-gray-800"
          >
            <h2 className="text-xl font-semibold">
              {app.applicant?.name}
            </h2>
            <p className="text-gray-400">
              {app.applicant?.email}
            </p>

            <p className="mt-2">
              Status:{" "}
              <span
                className={`font-semibold ${
                  app.status === "accepted"
                    ? "text-green-400"
                    : app.status === "rejected"
                    ? "text-red-400"
                    : "text-yellow-400"
                }`}
              >
                {app.status}
              </span>
            </p>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => updateStatus(app._id, "accepted")}
                className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
              >
                Accept
              </button>

              <button
                onClick={() => updateStatus(app._id, "rejected")}
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
