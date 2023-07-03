const User = require("../../models/User");
const Note = require("../../models/Note");
const asynchandler = require("express-async-handler");

const notegetData = asynchandler(async (req, res) => {
  const notes = await Note.find().lean();
  if (!notes.length) {
    return res.status(200).json({ message: "NO NOTES FOUND" });
  }
  const notesWithUser = await Promise.all(
    notes.map(async (note) => {
      const user = await User.findById(note.user).lean();
      return { ...note, username: user.username };
    })
  );
  return res.json(notesWithUser);
});

module.exports = notegetData;
