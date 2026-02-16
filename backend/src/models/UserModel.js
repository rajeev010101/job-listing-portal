const mongoose = require("mongoose");


const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["jobseeker", "employer"],
      default: "jobseeker",
    },

    profile: {
      skills: [String],
      bio: String,
      resume: String,
      experience: String,

      avatar: String, // new field for profile image

      companyName: String,
      companyDescription: String,
      location: String,
      website: String,


     
    },

    verification: {
      isVerified: { type: Boolean, default: false },
      documents: String, // optional upload later
      verifiedAt: Date
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
