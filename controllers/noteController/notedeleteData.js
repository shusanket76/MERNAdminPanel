const Note = require("../../models/Note");
const asynchandler = require("express-async-handler");

const deleteNote = asynchandler(async (req, res) => {
  const { id } = req.body;
  const note = await Note.findById(id).exec();
  if (!note) {
    return res.status(400).json({ message: "TASK NOT FOUND" });
  }
//   if (!note.completed) {
//     return res.status(400).json({ message: "TASK NOT COMPLETED" });
//   }
  await note.deleteOne();
  return res.status(200).json({ message: "DELETED" });
});

module.exports = deleteNote;
