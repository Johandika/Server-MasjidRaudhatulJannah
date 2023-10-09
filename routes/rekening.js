const Controller = require("../controller/rekening");
const ApiKey = require("../middleware/ApiKey");
const authentication = require("../middleware/authentication");

const rekeningRouter = require("express").Router();

rekeningRouter.get("/", ApiKey, Controller.getAll);

rekeningRouter.get("/:id", ApiKey, Controller.getOne);

rekeningRouter.post("/", authentication, Controller.craete);

rekeningRouter.patch("/:id", authentication, Controller.update);

rekeningRouter.delete("/:id", authentication, Controller.delete);

module.exports = rekeningRouter;
