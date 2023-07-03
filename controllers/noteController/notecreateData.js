const User = require("../../models/User");
const Note = require("../../models/Note");
const asyncHandler = require("express-async-handler");

// const notecreateData = asynchandler(async (req, res) => {
//   const { user, title, body, completed } = req.body;
//   if (!user || !title || !body ) {
//     return res.status(400).json({ message: "All fields are required" });
//   } else {
//     const noteObject = { user, title, body };
//     console.log("hi");
//     const note = await Note.create(noteObject);

//     if (note) {
//       return res.json("created");
//     } else {
//       return res.json("FAILED");
//     }
//   }
// });

// module.exports = notecreateData;

const createNewNote = asyncHandler(async (req, res) => {
  const { user, text } = req.body;

  // Confirm data
  if (!user || !text) {
    return res.status(204).json({ message: "All fields are required" });
  }

  // Check for duplicate title
  const duplicate = await Note.findOne({ text }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate note title" });
  }

  // Create and store the new user
  const noteObject = { user, text };
  console.log(noteObject);
  const note = await Note.create(noteObject);

  if (note) {
    // Created
    return res.status(201).json({ message: "New note created" });
  } else {
    return res.status(400).json({ message: "Invalid note data received" });
  }
});

module.exports = createNewNote;
