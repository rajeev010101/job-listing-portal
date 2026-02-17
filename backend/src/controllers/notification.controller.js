const Notification = require("../models/notification.model");

exports.getMyNotifications = async (req, res) => {
  const notes = await Notification.find({ user: req.user.id })
    .sort({ createdAt: -1 });

  res.json(notes);
};

exports.markRead = async (req, res) => {
  await Notification.findByIdAndUpdate(req.params.id, {
    read: true
  });

  res.json({ message: "Marked as read" });
};
