const Job = require("../models/Job.model");
const Application = require("../models/Application.model");
const User = require("../models/UserModel");

exports.jobSeekerDashboard = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  const apps = await Application.find({ applicant: req.user.id })
    .populate("job");

  res.json({
    profile: user.profile,
    totalApplications: apps.length,
    applications: apps
  });
};

exports.employerDashboard = async (req, res) => {
  const jobs = await Job.find({ employer: req.user.id });

  const stats = await Application.aggregate([
    {
      $lookup: {
        from: "jobs",
        localField: "job",
        foreignField: "_id",
        as: "jobData"
      }
    },
    { $unwind: "$jobData" },
    {
      $match: { "jobData.employer": req.user.id }
    },
    {
      $group: {
        _id: "$job",
        totalApplicants: { $sum: 1 }
      }
    }
  ]);

  res.json({
    jobsPosted: jobs.length,
    jobs,
    stats
  });
};
