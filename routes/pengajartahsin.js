const Controller = require("../controller/pengajartahsin");
const ApiKey = require("../middleware/ApiKey");
const authentication = require("../middleware/authentication");

const pengajartahsinRouter = require("express").Router();

pengajartahsinRouter.get("/", ApiKey, Controller.getAll);

pengajartahsinRouter.get("/:id", ApiKey, Controller.getOne);

pengajartahsinRouter.post("/", authentication, Controller.craete);

pengajartahsinRouter.patch("/:id", authentication, Controller.update);

pengajartahsinRouter.patch(
  "/status/:id",
  authentication,
  Controller.updateStatusAktif
);

pengajartahsinRouter.delete("/:id", authentication, Controller.delete);

module.exports = pengajartahsinRouter;
