const Controller = require("../controller/rekening");
const authentication = require("../middleware/authentication");

const rekeningRouter = require("express").Router();

rekeningRouter.get("/", authentication, Controller.getAll);

rekeningRouter.get("/:id", authentication, Controller.getOne);

rekeningRouter.post("/", authentication, Controller.craete);

rekeningRouter.patch("/:id", authentication, Controller.update);

rekeningRouter.delete("/:id", authentication, Controller.delete);

module.exports = rekeningRouter;
