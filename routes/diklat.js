const Controller = require("../controller/diklat");
const authentication = require("../middleware/authentication");

const diklatRouter = require("express").Router();

diklatRouter.get("/", authentication, Controller.getAll);

diklatRouter.get("/:id", authentication, Controller.getOne);

diklatRouter.post("/", authentication, Controller.craete);

diklatRouter.patch("/:id", authentication, Controller.update);

diklatRouter.delete("/:id", authentication, Controller.delete);

module.exports = diklatRouter;
