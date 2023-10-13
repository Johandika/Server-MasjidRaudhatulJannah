const Controller = require("../controller/divisi");
const ApiKey = require("../middleware/ApiKey");
const authentication = require("../middleware/authentication");

const divisiRouter = require("express").Router();

divisiRouter.get("/", ApiKey, Controller.getAll);

divisiRouter.get("/:id", ApiKey, Controller.getOne);

divisiRouter.post("/", authentication, Controller.craete);

divisiRouter.patch("/:id", authentication, Controller.update);

divisiRouter.patch("/status/:id", authentication, Controller.updateStatusAktif);

divisiRouter.delete("/:id", authentication, Controller.delete);

module.exports = divisiRouter;
