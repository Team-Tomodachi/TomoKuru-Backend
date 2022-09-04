const express = require("express");
const usersRouter = require("../routes/users");
const venuesRouter = require("../routes/venues");
const groupsRouter = require("../routes/groups");
const eventsRouter = require("../routes/events");

const setupExpressServer = () => {
  const app = express();
  app.use(express.json());

  app.use("/api/users", usersRouter);
  app.use("/api/venues", venuesRouter);
  app.use("/api/groups", groupsRouter);
  app.use("/api/events", eventsRouter);

  //remove test end point after api development is complete
  app.get("/api/test", (req, res) => {
    res.send("Successful call to the server").status(200);
  });

  return app;
};

module.exports = { setupExpressServer };
