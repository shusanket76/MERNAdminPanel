const User = require("../../models/User");
const Note = require("../../models/Note");
const asynchandler = require("express-async-handler");

const deleteUser = asynchandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "USER ID REQUIRED" });
  }
  const notes = await Note.findOne({ user: id }).lean().exec();
  if (notes) {
    return res
      .status(400)
      .json({ message: "USER HAS NOT COMPLETED TODO WORK " });
  }
  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(400).json7({ message: "NO USER FOUND" });
  }
  const result = await user.deleteOne();
  const reply = `${result.username} HAS BEEN DELETED`;
  return res.status(200).json({ message: reply });
});

module.exports = deleteUser;
