const Controller = require("../controller/pesertatahsindewasa");
const ApiKey = require("../middleware/ApiKey");
const authentication = require("../middleware/authentication");

const pesertaTahsinDewasaRouter = require("express").Router();

pesertaTahsinDewasaRouter.get("/", ApiKey, Controller.getAll);

pesertaTahsinDewasaRouter.get("/:id", ApiKey, Controller.getOne);

pesertaTahsinDewasaRouter.post("/", authentication, Controller.craete);

pesertaTahsinDewasaRouter.patch("/:id", authentication, Controller.update);

pesertaTahsinDewasaRouter.patch(
  "/status/:id",
  authentication,
  Controller.updateStatusAktif
);

pesertaTahsinDewasaRouter.delete("/:id", authentication, Controller.delete);

module.exports = pesertaTahsinDewasaRouter;
