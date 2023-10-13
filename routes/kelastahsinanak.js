const Controller = require("../controller/kelastahsinanak");
const ApiKey = require("../middleware/ApiKey");
const authentication = require("../middleware/authentication");

const kelasTahsinAnakRouter = require("express").Router();

kelasTahsinAnakRouter.get("/", ApiKey, Controller.getAll);

kelasTahsinAnakRouter.get("/:id", ApiKey, Controller.getOne);

kelasTahsinAnakRouter.post("/", authentication, Controller.craete);

kelasTahsinAnakRouter.patch("/:id", authentication, Controller.update);

kelasTahsinAnakRouter.patch(
  "/status/:id",
  authentication,
  Controller.updateStatusAktif
);

kelasTahsinAnakRouter.delete("/:id", authentication, Controller.delete);

module.exports = kelasTahsinAnakRouter;
