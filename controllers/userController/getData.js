const User = require("../../models/User");
const Note = require("../../models/Note");
const asynchandler = require("express-async-handler");


const getAllUsers = asynchandler(async (req, res) => {
  const users = await User.find().select("-password").lean();

  if (!users.length) {
    return res.status(200).json({ messgae: "NO USER" });
  }
  return res.json(users);
});

module.exports = getAllUsers;
