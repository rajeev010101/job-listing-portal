const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");
const controller = require("../controllers/Application.controller");

// Apply job
router.post("/:jobId", auth, controller.applyJob);

// Get my applications (jobseeker)
router.get("/my", auth, controller.getMyApplications);

// Get applicants for a job (employer)
router.get("/job/:jobId", auth, controller.getJobApplicants);

// Update status (accept / reject)
router.put("/:applicationId/status", auth, controller.updateApplicationStatus);

module.exports = router;