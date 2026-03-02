import { useEffect, useState } from "react";
import api from "../services/api";
import { motion } from "framer-motion";
import DashboardLayout from "../components/layout/DashboardLayout";
import AnalyticsCharts from "../components/dashboard/AnalyticsCharts";



export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const role = localStorage.getItem("role");

        if (role === "employer") {
          const res = await api.get("/dashboard/employer");
          setData({ role: "employer", ...res.data });
        } else {
          const res = await api.get("/dashboard/jobseeker");
          setData({ role: "jobseeker", ...res.data });
        }
      } catch (err) {
        console.error("Dashboard error:", err);
      }
    };

    fetchDashboard();
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen bg-pink-50 dark:bg-gray-950 text-black dark:text-white p-10 transition-all">
        <p className="animate-pulse text-xl">Loading dashboard...</p>
      </div>
    );
  }

  return (
  <DashboardLayout>
    {data.role === "employer" ? (
      <EmployerDashboard data={data} />
    ) : (
      <JobSeekerDashboard data={data} />
    )}

    <AnalyticsCharts data={data} role={data.role} />

  </DashboardLayout>
);
}

function EmployerDashboard({ data }) {
  return (
    <>
      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-8 mb-10">
        <StatCard title="Jobs Posted" value={data.jobsPosted || 0} color="blue" />
        <StatCard title="Total Jobs" value={data.jobs?.length || 0} color="purple" />
        <StatCard title="Active Status" value="Active" color="green" />
      </div>

      {/* Job List */}
      <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Your Jobs</h2>
          <a
            href="/manage-jobs"
            className="bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Manage Jobs
          </a>
        </div>

        {data.jobs?.length === 0 && (
          <p className="text-gray-400">No jobs posted yet.</p>
        )}

        <div className="space-y-4">
          {data.jobs?.map((job) => (
            <motion.div
              key={job._id}
              whileHover={{ scale: 1.02 }}
              className="p-5 bg-gray-800 rounded-xl border border-gray-700"
            >
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <p className="text-gray-400 text-sm mt-1">{job.location}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}

function JobSeekerDashboard({ data }) {
  return (
    <>
      {/* Stats */}
      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <StatCard title="Applications" value={data.totalApplications || 0} color="blue" />
        <StatCard title="Profile Status" value="Active" color="green" />
      </div>

      {/* Applications */}
      <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 shadow-xl">
        <h2 className="text-2xl font-semibold mb-6">My Applications</h2>

        {data.applications?.length === 0 && (
          <p className="text-gray-400">No applications yet.</p>
        )}

        <div className="space-y-4">
          {data.applications?.map((app) => (
            <motion.div
              key={app._id}
              whileHover={{ scale: 1.02 }}
              className="p-5 bg-gray-800 rounded-xl border border-gray-700 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{app.job?.title}</h3>
                <p className="text-sm text-gray-400">{app.job?.location}</p>
              </div>

              <StatusBadge status={app.status} />
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}

function StatCard({ title, value, color }) {
  const colors = {
    blue: "from-blue-600 to-blue-400",
    purple: "from-purple-600 to-purple-400",
    green: "from-green-600 to-green-400",
  };

  return (
    <div className={`p-8 rounded-2xl bg-gradient-to-br ${colors[color]} shadow-xl`}>
      <h2 className="text-white/80">{title}</h2>
      <p className="text-4xl font-bold mt-2">{value}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    pending: "bg-yellow-500",
    accepted: "bg-green-600",
    rejected: "bg-red-600",
  };

  return (
    <span className={`px-4 py-1 rounded-full text-sm font-semibold ${styles[status] || "bg-gray-600"}`}>
      {status}
    </span>
  );
}
