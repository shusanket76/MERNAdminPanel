const express = require("express");
const router = express.Router();
const getAllUsers = require("../controllers/userController/getData");
const createUsers = require("../controllers/userController/create");
const updateUsers = require("../controllers/userController/updateData");
const deleteUsers = require("../controllers/userController/deleteData");
const verifyJwt = require("../middleware/verifyJwt");

router
  .route("/")
  .get(verifyJwt, getAllUsers)

  .post(createUsers)
  .patch(verifyJwt, updateUsers)
  .delete(verifyJwt, deleteUsers);

module.exports = router;
