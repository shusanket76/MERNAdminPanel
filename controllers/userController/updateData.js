const User = require("../../models/User");
const Note = require("../../models/Note");
const asynchandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const updateUser = asynchandler(async (req, res) => {
  const { id, username, roles, active, password } = req.body;
  if (!id || !username || !roles.length) {
    return res.status(400).json({ message: "ALL FIELDS ARE REQUIRED" });
  }
  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(400).json({ message: "USER NOT FOUND" });
  }
  const duplicate = await User.findOne({ username }).lean().exec();
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(400).json({ message: "THIS IS DUPLICATE VALUE" });
  }

  user.username = username;
  user.roles = roles;
  user.active = active;

  if (password.length !== 0) {
    user.password = await bcrypt.hash(password, 10);
  }
  const updateUser = await user.save();

  return res.status(200).json({ message: "UPDATED SUCCESSFULLY " });
});

module.exports = updateUser;
