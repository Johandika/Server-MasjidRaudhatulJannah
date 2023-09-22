const Controller = require("../controller/kajian");
const authentication = require("../middleware/authentication");

const kajianRouter = require("express").Router();

kajianRouter.get("/", authentication, Controller.getAll);

kajianRouter.get("/:id", authentication, Controller.getOne);

kajianRouter.post("/", authentication, Controller.craete);

kajianRouter.patch("/:id", authentication, Controller.update);

kajianRouter.delete("/:id", authentication, Controller.delete);

module.exports = kajianRouter;
