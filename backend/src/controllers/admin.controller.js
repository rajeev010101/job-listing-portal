const User = require("../models/UserModel");

exports.verifyEmployer = async (req, res) => {
  const employer = await User.findById(req.params.id);

  if (!employer || employer.role !== "employer")
    return res.status(404).json({ error: "Employer not found" });

  employer.verification = {
    isVerified: true,
    status: "approved",
    verifiedAt: new Date()
  };

  await employer.save();

  res.json({ message: "Employer approved", verification: employer.verification });
};


exports.rejectEmployer = async (req, res) => {
  const { reason } = req.body;

  const employer = await User.findById(req.params.id);

  employer.verification.status = "rejected";
  employer.verification.rejectedAt = new Date();
  employer.verification.rejectionReason = reason;
  employer.verification.isVerified = false;

  await employer.save();

  res.json({ message: "Employer rejected" });
};
