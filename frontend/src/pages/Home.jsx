import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className= "min-h-screen bg-pink-50 dark:bg-gray-950 text-black dark:text-white p-10 transition-all">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6">
        <h1 className="text-2xl font-bold">JobPortal</h1>
        <div className="space-x-6">
          <a href="/login" className="hover:text-blue-400">Login</a>
          <a href="/register" className="bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-700">
            Get Started
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center text-center mt-24 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold leading-tight"
        >
          Find Your Dream Job
          <br />
          Or Hire Top Talent
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-6 text-gray-400 max-w-2xl"
        >
          A modern job marketplace connecting job seekers and employers
          with powerful dashboards, analytics, and real-time applications.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-10 flex gap-4"
        >
          <a
            href="/register"
            className="bg-blue-600 px-8 py-4 rounded-xl text-lg hover:bg-blue-700 shadow-lg"
          >
            Start Hiring
          </a>

          <a
            href="/jobs"
            className="border border-gray-600 px-8 py-4 rounded-xl text-lg hover:bg-gray-800"
          >
            Browse Jobs
          </a>
        </motion.div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-10 px-10 mt-32 pb-20">
        {[
          {
            title: "Smart Matching",
            desc: "AI-powered matching between employers and job seekers."
          },
          {
            title: "Real-Time Applications",
            desc: "Instant notifications and live application tracking."
          },
          {
            title: "Analytics Dashboard",
            desc: "Powerful insights to manage hiring efficiently."
          }
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-800"
          >
            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-gray-400">{feature.desc}</p>
          </motion.div>
        ))}
      </section>

    </div>
  );
}
