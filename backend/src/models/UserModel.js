const mongoose = require("mongoose");

// EXPERIENCE SCHEMA
const experienceSchema = new mongoose.Schema({
  company: String,
  role: String,
  startDate: String,
  endDate: String,
  description: String
});

// EDUCATION SCHEMA
const educationSchema = new mongoose.Schema({
  school: String,
  degree: String,
  year: String
});

// PROJECT SCHEMA
const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  link: String
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true
    },

    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["jobseeker", "employer"],
      default: "jobseeker",
    },

    // PROFILE SECTION
   profile: {
  skills: [String],
  bio: String,
  resume: String,

  experience: String,
  education: String,

  avatar: String,

  linkedin: String,
  github: String,
  portfolio: String,

  companyName: String,
  companyDescription: String,
  location: String,
  website: String,
},
    // VERIFICATION SYSTEM
    verification: {
      isVerified: { type: Boolean, default: false },

      status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
      },

      requestedAt: Date,
      verifiedAt: Date,
      rejectedAt: Date,
      rejectionReason: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);