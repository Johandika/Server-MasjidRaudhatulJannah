const Controller = require("../controller/ustadz");
const ApiKey = require("../middleware/ApiKey");
const authentication = require("../middleware/authentication");

const ustadzRouter = require("express").Router();

ustadzRouter.get("/", ApiKey, Controller.getAll);

ustadzRouter.get("/:id", ApiKey, Controller.getOne);

ustadzRouter.post("/", authentication, Controller.craete);

ustadzRouter.patch("/:id", authentication, Controller.update);

ustadzRouter.patch("/status/:id", authentication, Controller.updateStatusAktif);

ustadzRouter.delete("/:id", authentication, Controller.delete);

module.exports = ustadzRouter;
