const User = require("../models/UserModel");

module.exports = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (user.role !== "employer")
    return res.status(403).json({ error: "Only employers allowed" });

  if (!user.verification.isVerified)
    return res.status(403).json({ error: "Employer not verified yet" });

  next();
};
