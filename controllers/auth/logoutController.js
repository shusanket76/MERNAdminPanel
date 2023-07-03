const logout = (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.jwt) {
    return res.sendStatus(204);
  }
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "COOKIE CLEARED" });
};

module.exports = logout;
