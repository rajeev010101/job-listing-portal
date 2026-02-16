const express = require("express");
const router = express.Router();
const controller = require("../controllers/job.controller");
const auth = require("../middlewares/auth.middleware");
const employerOnly = require("../middlewares/employer.middleware");

router.get("/", controller.getJobs);
router.get("/:id", controller.getJob);

router.post("/", auth, employerOnly, controller.createJob);
router.put("/:id", auth, employerOnly, controller.updateJob);
router.delete("/:id", auth, employerOnly, controller.deleteJob);

module.exports = router;
