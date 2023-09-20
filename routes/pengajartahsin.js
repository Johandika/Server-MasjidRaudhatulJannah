const Controller = require("../controller/pengajartahsin");
const authentication = require("../middleware/authentication");

const pengajartahsinRouter = require("express").Router();

pengajartahsinRouter.get("/", authentication, Controller.getAll);

pengajartahsinRouter.get("/:id", authentication, Controller.getOne);

pengajartahsinRouter.post("/:id", authentication, Controller.craete);

pengajartahsinRouter.patch("/:id", authentication, Controller.update);

pengajartahsinRouter.delete("/:id", authentication, Controller.delete);

module.exports = pengajartahsinRouter;
