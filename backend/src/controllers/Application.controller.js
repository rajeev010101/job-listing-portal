const Application = require("../models/Application.model");
const Job = require("../models/Job.model");

exports.applyJob = async (req, res) => {
  const job = await Job.findById(req.params.jobId);

  if (!job) return res.status(404).json({ error: "Job not found" });

  // prevent duplicate apply
  const existing = await Application.findOne({
    job: job._id,
    applicant: req.user.id
  });

  if (existing)
    return res.status(400).json({ error: "Already applied" });

  const application = await Application.create({
    job: job._id,
    applicant: req.user.id
  });

  res.json(application);
};

exports.getMyApplications = async (req, res) => {
  const apps = await Application.find({ applicant: req.user.id })
    .populate("job");

  res.json(apps);
};

exports.getJobApplicants = async (req, res) => {
  const apps = await Application.find({ job: req.params.jobId })
    .populate("applicant", "name email profile");

  res.json(apps);
};
