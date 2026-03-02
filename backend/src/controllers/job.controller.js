const Job = require("../models/Job.model");

exports.createJob = async (req, res) => {
  const job = await Job.create({
    ...req.body,
    employer: req.user.id
  });

  res.json(job);
};

exports.getJobs = async (req, res) => {
  const jobs = await Job.find().populate("employer", "name verification");
  res.json(jobs);
};

exports.getJob = async (req, res) => {
  const job = await Job.findById(req.params.id)
    .populate("employer", "name verification");

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

// job search with pagination

exports.searchJobs = async (req, res) => {
  const {
    q,
    location,
    minSalary,
    maxSalary,
    category,
    sort = "newest",
    page = 1,
    limit = 10,
  } = req.query;

  const query = {};

  if (q) query.title = { $regex: q, $options: "i" };
  if (location) query.location = { $regex: location, $options: "i" };
  if (category) query.category = category;

  if (minSalary || maxSalary) {
    query.salaryNumber = {};
    if (minSalary) query.salaryNumber.$gte = Number(minSalary);
    if (maxSalary) query.salaryNumber.$lte = Number(maxSalary);
  }

  let sortOption = { createdAt: -1 };

  if (sort === "salary-high") sortOption = { salaryNumber: -1 };
  if (sort === "salary-low") sortOption = { salaryNumber: 1 };

  const jobs = await Job.find(query)
    .populate("employer", "verification")
    .sort(sortOption)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const total = await Job.countDocuments(query);

  res.json({
    total,
    page: Number(page),
    results: jobs,
  });
};