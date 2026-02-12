const User = require("../models/UserModel");

exports.verifyEmployer = async (req, res) => {
  const employer = await User.findById(req.params.id);

  if (!employer || employer.role !== "employer")
    return res.status(404).json({ error: "Employer not found" });

  employer.verification.isVerified = true;
  employer.verification.verifiedAt = new Date();

  await employer.save();

  res.json({ message: "Employer verified" });
};
