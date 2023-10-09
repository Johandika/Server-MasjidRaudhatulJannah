const Controller = require("../controller/uangmasuk");
const ApiKey = require("../middleware/ApiKey");
const authentication = require("../middleware/authentication");

const uangMasukRouter = require("express").Router();

uangMasukRouter.get("/", ApiKey, Controller.getAll);
uangMasukRouter.get("/:id", ApiKey, Controller.getOne);
uangMasukRouter.post("/", authentication, Controller.create);
uangMasukRouter.patch("/:id", authentication, Controller.update);
uangMasukRouter.delete("/:id", authentication, Controller.delete);

module.exports = uangMasukRouter;
