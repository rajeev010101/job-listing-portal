import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 text-black dark:text-white px-8 py-4 flex justify-between items-center transition-all duration-300">

      <Link
        to="/"
        className="text-2xl font-bold text-blue-600 dark:text-blue-500"
      >
        HireHub
      </Link>

      <div className="flex items-center gap-6 text-gray-700 dark:text-gray-300">

        <Link to="/jobs" className="hover:text-black dark:hover:text-white">
          Jobs
        </Link>

        {role === "employer" && (
          <>
            <Link to="/create-job" className="hover:text-black dark:hover:text-white">
              Post Job
            </Link>
            <Link to="/manage-jobs" className="hover:text-black dark:hover:text-white">
              Manage
            </Link>
          </>
        )}

        <Link to="/dashboard" className="hover:text-black dark:hover:text-white">
          Dashboard
        </Link>

        <Link to="/profile" className="hover:text-black dark:hover:text-white">
          My Profile
        </Link>

        <Link to="/notifications" className="hover:text-black dark:hover:text-white">
          Notifications
        </Link>

        {/*  Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:opacity-80 transition"
        >
          {theme === "dark" ? " Light" : " Dark"}
        </button>

         <button
          onClick={logout}
          className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 text-white"
        >
          Login
        </button>

        <button
          onClick={logout}
          className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 text-white"
        >
          Logout
        </button>

      </div>
    </nav>
  );
}