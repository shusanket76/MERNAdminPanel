const rateLimit = require("express-rate-limit");
const { logEvents } = require("./logger");
const { options } = require("../routes/root");

const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 3,
  message: {
    message: "TOO MANY LOGIN ATTEMPTS, PLEASE TRY AGAIN 60 SECONDS",
    handler: (req, res, next, options) => {
      logEvents(
        `TOO MANY REQUESTS: ${options.message.message}\t${req.method}\t${req.url}`,
        "errorLog.log"
      );
      res.status(options.statusCode).send(options.message);
    },
    standardHeaders: true,
    legacyHeaders: false,
  },
});
module.exports = loginLimiter;
