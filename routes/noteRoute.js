const express = require("express");
const router = express.Router();
const createNewNote = require("../controllers/noteController/notecreateData");
const notegetData = require("../controllers/noteController/notegetData");
const updateNote = require("../controllers/noteController/noteupdateData");
const deleteNote = require("../controllers/noteController/notedeleteData");
const verifyJwt = require("../middleware/verifyJwt");

router.use(verifyJwt);
router
  .route("/")
  .get(notegetData)
  .post(createNewNote)
  .patch(updateNote)
  .delete(deleteNote);

module.exports = router;
