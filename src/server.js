const express = require("express");
const app = express();
const morgan = require("morgan");
const router = require("./routes/router");

const errorHandler = (err, req, res, next) => {
  res.status(500).send("Error found: " + err.stack);
};

const startServer = (port) => {
  app
    .use(express.urlencoded({ extended: false }))
    .use(express.json())
    .use(morgan("dev"))
    .use("/", router)
    .use(errorHandler);

  app.listen(port);

  console.log("Server was started at http://localhost:" + port);
};

module.exports = startServer;
