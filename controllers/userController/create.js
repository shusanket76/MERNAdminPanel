const User = require("../../models/User");
const Note = require("../../models/Note");
const asynchandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const createNewUser = asynchandler(async (req, res) => {
  const { username, password, roles } = req.body;
  //Confirm data
  if (!username || !password || !Array.isArray(roles) || !roles.length) {
    return res.status(400).json({ message: "ALL FIELDS ARE REQUIRED" });
  }
  const duplicate = await User.findOne({ username }).lean().exec();
  if (duplicate) {
    return res.status(409).json({ message: "USER EXIST WITH THIS USERNAME" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const userObject = { username, password: hashedPassword, roles };
  const user = await User.create(userObject);
  if (user) {
    res.status(201).json({ message: "USER CREATED SUCCESSFULLY" });
  } else {
    res.status(400).json({ message: "INVALID USER DATA RECEIVED" });
  }
});

module.exports = createNewUser;
