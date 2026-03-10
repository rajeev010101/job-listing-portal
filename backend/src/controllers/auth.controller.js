const authService = require("../services/auth.service");

exports.register = async (req, res) => {
  try {
    await authService.registerUser(req.body);
    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);

    res.json({
      token: result.token,
      role: result.user.role,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
