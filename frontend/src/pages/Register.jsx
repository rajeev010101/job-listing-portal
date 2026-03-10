import { useState } from "react";
import { motion } from "framer-motion";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "jobseeker",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validatePassword = () => {
    if (form.password.length < 6) {
      return "Password must be at least 6 characters";
    }
    if (form.password !== form.confirmPassword) {
      return "Passwords do not match";
    }
    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const passwordError = validatePassword();
    if (passwordError) {
      setError(passwordError);
      setLoading(false);
      return;
    }

    try {
      const res = await api.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      });

      setSuccess(
        form.role === "employer"
          ? "Registration successful! Please wait for admin verification."
          : "Registration successful! Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Registration failed. Try another email."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  bg-pink-50 dark:bg-gray-950 text-black dark:text-white p-10 transition-all">

      <motion.form
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleRegister}
        className="bg-gray-900/80 backdrop-blur-xl p-10 rounded-2xl shadow-2xl border border-gray-800 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">
          Create Account
        </h2>

        {error && (
          <p className="bg-red-500/20 text-red-400 p-3 rounded mb-4 text-center">
            {error}
          </p>
        )}

        {success && (
          <p className="bg-green-500/20 text-green-400 p-3 rounded mb-4 text-center">
            {success}
          </p>
        )}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          value={form.name}
          onChange={handleChange}
          className="w-full p-4 mb-4 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={handleChange}
          className="w-full p-4 mb-4 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={handleChange}
          className="w-full p-4 mb-4 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full p-4 mb-4 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full p-4 mb-6 rounded-lg bg-gray-800 border border-gray-700"
        >
          <option value="jobseeker">Job Seeker</option>
          <option value="employer">Employer</option>
        </select>

        {form.role === "employer" && (
          <p className="text-sm text-yellow-400 mb-4">
            Employer accounts require admin verification before posting jobs.
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 p-4 rounded-lg hover:bg-blue-700 font-semibold shadow-lg disabled:opacity-50"
        >
          {loading ? "Creating..." : "Register"}
        </button>

        <p className="text-gray-400 text-center mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Login
          </a>
        </p>
      </motion.form>
    </div>
  );
}