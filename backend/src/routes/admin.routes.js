const express = require("express");
const router = express.Router();
const controller = require("../controllers/admin.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/verify/:id", auth, controller.verifyEmployer);

module.exports = router;
