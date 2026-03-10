import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const role = localStorage.getItem("role");

  const linkClass =
    "block px-4 py-3 rounded-lg transition hover:bg-gray-800";

  const activeClass = "bg-gray-800 text-white";

  return (
    <aside className="min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white p-10 transition-all">

      <h2 className="text-2xl font-bold text-blue-500 mb-10">
        HireHub
      </h2>

      <nav className="space-y-3">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/jobs"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          Browse Jobs
        </NavLink>

        {role === "employer" && (
          <>
            <NavLink
              to="/create-job"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : ""}`
              }
            >
              Post Job
            </NavLink>

            <NavLink
              to="/manage-jobs"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : ""}`
              }
            >
              Manage Jobs
            </NavLink>
          </>
        )}

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          Profile
        </NavLink>

        <NavLink
          to="/notifications"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          Notifications
        </NavLink>

      </nav>
    </aside>
  );
}
