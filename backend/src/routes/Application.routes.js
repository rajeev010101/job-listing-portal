const express = require("express");
const router = express.Router();
const controller = require("../controllers/Application.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/apply/:jobId", auth, controller.applyJob);
router.get("/my", auth, controller.getMyApplications);
router.get("/job/:jobId", auth, controller.getJobApplicants);

module.exports = router;
