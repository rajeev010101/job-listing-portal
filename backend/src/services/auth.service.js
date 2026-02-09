const User = require("../models/UserModel");
const { hashPassword, comparePassword } = require("../utils/hash");
const { generateToken } = require("../utils/token");

exports.registerUser = async (data) => {
  const existing = await User.findOne({ email: data.email });
  if (existing) throw new Error("User already exists");

  const hashed = await hashPassword(data.password);

  const user = await User.create({
    ...data,
    password: hashed,
  });

  return user;
};

exports.loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const match = await comparePassword(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const token = generateToken(user);

  return { user, token };
};
