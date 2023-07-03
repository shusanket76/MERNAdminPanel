const express = require("express");
const app = express();
const PORT = 4000;
const path = require("path");
const task = require("./routes/root");
const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectdb = require("./config/dbConnect");
const mongoose = require("mongoose");
const user = require("./routes/userRoute");
const note = require("./routes/noteRoute");
const auth = require("./routes/auth");
var cookieParser = require("cookie-parser");

connectdb();

app.use(logger);
app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use("/", task);
app.use("/auth", auth);
app.use("/users", user);
app.use("/notes", note);
app.all("*", (req, res) => {
  res.send("404 NOT FOUND!!!!");
});
app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("CONNECTED TO DATABASE");

  app.listen(PORT, () => {
    console.log(`SERVRR RUNNING ON  ${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  logEvents(`${err.name}\t${err.message}\n`, "mongoerrorLog.log");
});
