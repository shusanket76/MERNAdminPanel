const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const refreshController = (req, res) => {
  const cookies = req.cookies;

  if (!cookies.jwt) {
    return res.status(401).json({ message: "UNAUTHORIZED" });
  }
  const refreshTokens = cookies.jwt;

  jwt.verify(
    refreshTokens,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "FORBIDDEN" });
      }
      const foundUser = await User.findOne({ username: decoded.username });
      if (!foundUser) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const accessToken = jwt.sign(
        {
          UserInfo: {
            id: foundUser._id,
            username: foundUser.username,
            roles: foundUser.roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      res.json({ accessToken });
    })
  );
};

module.exports = refreshController;
