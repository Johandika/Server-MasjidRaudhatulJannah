const Controller = require("../controller/pesertatahsinanak");
const ApiKey = require("../middleware/ApiKey");
const authentication = require("../middleware/authentication");

const   pesertaTahsinAnakRouter = require("express").Router();

pesertaTahsinAnakRouter.get("/", ApiKey, Controller.getAll);

pesertaTahsinAnakRouter.get("/:id", ApiKey, Controller.getOne);

pesertaTahsinAnakRouter.post("/", authentication, Controller.craete);

pesertaTahsinAnakRouter.patch("/:id", authentication, Controller.update);

pesertaTahsinAnakRouter.patch(
  "/status/:id",
  authentication,
  Controller.updateStatusAktif
);

pesertaTahsinAnakRouter.delete("/:id", authentication, Controller.delete);

module.exports = pesertaTahsinAnakRouter;
