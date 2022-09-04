const express = require("express");

const setupExpressServer = () => {
  const app = express();
  app.use(express.json());

  app.get("/test", (req, res) => {
    res.send("Successful call to the server").status(200);
  });

  return app;
};

module.exports = { setupExpressServer };
