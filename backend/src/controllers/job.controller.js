const Job = require("../models/Job.model");

exports.createJob = async (req, res) => {
  const job = await Job.create({
    ...req.body,
    employer: req.user.id
  });

  res.json(job);
};

exports.getJobs = async (req, res) => {
  const jobs = await Job.find().populate("employer", "name email");
  res.json(jobs);
};

exports.getJob = async (req, res) => {
  const job = await Job.findById(req.params.id)
    .populate("employer", "name email");

  res.json(job);
};

exports.updateJob = async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (job.employer.toString() !== req.user.id)
    return res.status(403).json({ error: "Not your job" });

  Object.assign(job, req.body);
  await job.save();

  res.json(job);
};

exports.deleteJob = async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (job.employer.toString() !== req.user.id)
    return res.status(403).json({ error: "Not your job" });

  await job.deleteOne();

  res.json({ message: "Job deleted" });
};
