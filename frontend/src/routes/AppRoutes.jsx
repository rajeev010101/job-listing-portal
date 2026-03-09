import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Jobs from "../pages/Jobs";
import Profile from "../pages/Profile";
import Notifications from "../pages/Notifications";
import CreateJob from "../pages/CreateJob";
import ManageJobs from "../pages/ManageJobs";
import Applicants from "../pages/Applicants";
import ApplyJob from "../pages/ApplyJob";








export default function AppRoutes() {
  return (
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/create-job" element={<CreateJob />} />
        <Route path="/manage-jobs" element={<ManageJobs />} />
        <Route path="/applicants/:jobId" element={<Applicants />} />
        <Route path="/apply/:jobId" element={<ApplyJob />} />
      </Routes>
   
  );
}
