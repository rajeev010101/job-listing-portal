const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/profile", require("./routes/profile.routes"));
app.use("/uploads", express.static("uploads"));
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/jobs", require("./routes/job.routes"));
app.use("/api/applications", require("./routes/Application.routes"));
app.use("/api/dashboard", require("./routes/dashboard.routes"));
app.use("/api/notifications", require("./routes/notification.routes"));





module.exports = app;
