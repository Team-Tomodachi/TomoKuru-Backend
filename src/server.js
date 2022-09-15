const express = require("express");
const path = require("path");
const usersRouter = require("../routes/users");
const venuesRouter = require("../routes/venues");
const groupsRouter = require("../routes/groups");
const eventsRouter = require("../routes/events");
const tagsRouter = require("../routes/tags");
const cors = require("cors");

//SWAGGER setup
const swaggerUI = require("swagger-ui-express");
const swaggerFile = require("../swagger_output.json");
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
        url: "http://tomokuru.i-re.io",
      },
    ],
  },
  apis: [path.join(__dirname, "../routes/*.js")],
};

const swaggerSpecs = swaggerJsDoc(swaggerOptions);

const setupExpressServer = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use("/api_dev_docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

  app.use("/api/users", usersRouter);
  app.use("/api/venues", venuesRouter);
  app.use("/api/groups", groupsRouter);
  app.use("/api/events", eventsRouter);
  app.use("/api/tags", tagsRouter);

  //remove test end point after api development is complete
  app.get("/api/test", (req, res) => {
    res.send("Successful call to the server").status(200);
  });

  return app;
};

module.exports = { setupExpressServer };
