const User = require("../models/UserModel");
const { calculateScore } = require("../utils/profileScore");
const fs = require("fs");

// GET PROFILE
exports.getProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const score = calculateScore(user.profile || {});

    res.json({
      user,
      profileCompletion: score
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// UPDATE PROFILE
exports.updateProfile = async (req, res) => {

  try {

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let profileData = { ...req.body };

    // Convert skills string -> array
    if (profileData.skills && typeof profileData.skills === "string") {
      profileData.skills = profileData.skills
        .split(",")
        .map((s) => s.trim());
    }

    user.profile = {
      ...user.profile,
      ...profileData
    };

    await user.save();

    const score = calculateScore(user.profile);

    res.json({
      message: "Profile updated successfully",
      profile: user.profile,
      profileCompletion: score
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }

};


// UPLOAD RESUME
exports.uploadResume = async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({ message: "No resume uploaded" });
    }

    const user = await User.findById(req.user.id);

    // Delete old resume
    if (user.profile.resume && fs.existsSync(user.profile.resume)) {
      fs.unlinkSync(user.profile.resume);
    }

    user.profile.resume = req.file.path;

    await user.save();

    res.json({
      message: "Resume uploaded successfully",
      resume: user.profile.resume
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }

};


// UPLOAD AVATAR
exports.uploadAvatar = async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const user = await User.findById(req.user.id);

    // Delete old avatar
    if (user.profile.avatar && fs.existsSync(user.profile.avatar)) {
      fs.unlinkSync(user.profile.avatar);
    }

    user.profile.avatar = req.file.path;

    await user.save();

    res.json({
      message: "Avatar uploaded successfully",
      avatar: user.profile.avatar
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }

};