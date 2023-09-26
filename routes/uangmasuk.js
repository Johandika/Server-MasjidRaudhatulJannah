const Controller = require("../controller/uangmasuk");
const authentication = require("../middleware/authentication");

const uangMasukRouter = require("express").Router();

uangMasukRouter.get("/", authentication, Controller.getAll);
uangMasukRouter.get("/:id", authentication, Controller.getOne);
uangMasukRouter.post("/", authentication, Controller.create);
uangMasukRouter.patch("/:id", authentication, Controller.update);
uangMasukRouter.delete("/:id", authentication, Controller.delete);

module.exports = uangMasukRouter;
