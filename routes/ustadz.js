const Controller = require("../controller/ustadz");
const authentication = require("../middleware/authentication");

const ustadzRouter = require("express").Router();

ustadzRouter.get("/", authentication, Controller.getAll);

ustadzRouter.get("/:id", authentication, Controller.getOne);

ustadzRouter.post("/", authentication, Controller.craete);

ustadzRouter.patch("/:id", authentication, Controller.update);

ustadzRouter.delete("/:id", authentication, Controller.delete);

module.exports = ustadzRouter;
