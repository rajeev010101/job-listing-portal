import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function AnalyticsCharts({ data, role }) {

  if (role === "employer") {
    const chartData = [
      { name: "Jobs Posted", value: data.jobs?.length || 0 },
      { name: "Total Applicants", value: data.totalApplicants || 0 },
    ];

    return (
      <div className="grid md:grid-cols-2 gap-8 mt-10">

        {/* Bar Chart */}
        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
          <h2 className="text-xl font-semibold mb-6">
            Hiring Overview
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    );
  }

  // Jobseeker Chart
  const statusData = [
    { name: "Pending", value: data.applications?.filter(a => a.status === "pending").length || 0 },
    { name: "Accepted", value: data.applications?.filter(a => a.status === "accepted").length || 0 },
    { name: "Rejected", value: data.applications?.filter(a => a.status === "rejected").length || 0 },
  ];

  const COLORS = ["#facc15", "#22c55e", "#ef4444"];

  return (
    <div className="grid md:grid-cols-2 gap-8 mt-10">

      <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
        <h2 className="text-xl font-semibold mb-6">
          Application Status
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={statusData}
              dataKey="value"
              outerRadius={100}
              label
            >
              {statusData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}