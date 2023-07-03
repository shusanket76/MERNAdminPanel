const express = require("express");
const router = express.Router();
const loginLimiter = require("../middleware/loginlimiter");
const loginController = require("../controllers/auth/loginController");
const refresh = require("../controllers/auth/refreshController");
const logout = require("../controllers/auth/logoutController");

router.route("/").post(loginLimiter, loginController);

router.route("/refresh").get(refresh);

router.route("/logout").post(logout);

module.exports = router;
