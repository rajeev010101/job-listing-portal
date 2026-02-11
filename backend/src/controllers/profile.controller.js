const User = require("../models/UserModel");

exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};

exports.updateProfile = async (req, res) => {
  const user = await User.findById(req.user.id);

  user.profile = { ...user.profile, ...req.body };

  await user.save();

  res.json({ message: "Profile updated", profile: user.profile });
};


exports.uploadResume = async (req, res) => {
  const user = await User.findById(req.user.id);

  user.profile.resume = req.file.path;  
    await user.save();

    res.json({ message: "Resume uploaded", resume: user.profile.resume });
};

exports.uploadAvatar = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No image uploaded" });

  const user = await User.findById(req.user.id);
  user.profile.avatar = req.file.path;

  await user.save();

  res.json({
    message: "Avatar uploaded",
    avatar: req.file.path,
  });
};
