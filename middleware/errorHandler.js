const { logEvents } = require("./logger");

const errorHandler = (err, req, res, next) => {
  logEvents(
    `${err.name}\t${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    "errorLog.log"
  );
  const status = res.statusCode ? res.statusCode : 500; //server error
  res.status(status);
  res.json({ message: err.message });
  next();
};

module.exports = errorHandler;
