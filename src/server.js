const express = require("express");
const usersRouter = require("../routes/users");
const venuesRouter = require("../routes/venues");
const groupsRouter = require("../routes/groups");
const eventsRouter = require("../routes/events");

//SWAGGER setup
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.3",
    info: {
      title: "TomoKuru API",
      version: "1.0.0",
      description: "API used for the TomoKuru App",
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
  },
  apis: ["../routes/*.js"],
};

const swaggerSpecs = swaggerJsDoc(swaggerOptions);

const setupExpressServer = () => {
  const app = express();
  app.use(express.json());

  app.use("/api_dev_docs", swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

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
