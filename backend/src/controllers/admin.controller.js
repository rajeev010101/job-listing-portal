const User = require("../models/UserModel");

exports.verifyEmployer = async (req, res) => {
  console.log("VERIFY ROUTE HIT:", req.params.id);

  const employer = await User.findById(req.params.id);

  if (!employer || employer.role !== "employer") {
    return res.status(404).json({ error: "Employer not found" });
  }

  // ensure verification object exists
  if (!employer.verification) {
    employer.verification = {};
  }

  employer.verification.isVerified = true;
  employer.verification.verifiedAt = new Date();

  await employer.save();

  console.log("UPDATED:", employer.verification);

  res.json({
    message: "Employer verified",
    verification: employer.verification
  });
};
