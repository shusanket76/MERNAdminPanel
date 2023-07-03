const User = require("../../models/User");
const Note = require("../../models/Note");
const asyncHandler = require("express-async-handler");

const updateNote = asyncHandler(async (req, res) => {
  const { id, user, text, completed } = req.body;
  console.log(text);
  if (!text) {
    return res.status(400).json({ message: "ALL FIELDS REQUIRED" });
  }
  const note = await Note.findById(id).exec();
  const userF = await User.findById(user).lean();
  note.user = userF._id;

  note.text = text;
  note.completed = completed;

  const updateNote = await note.save();

  return res.status(200).json({ message: "NOTE EDITED" });
});
module.exports = updateNote;
