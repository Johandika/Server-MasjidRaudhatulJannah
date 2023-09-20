const Controller = require("../controller/divisi");
const authentication = require("../middleware/authentication");

const divisiRouter = require("express").Router();

divisiRouter.get("/", authentication, Controller.getAll);

divisiRouter.get("/:id", authentication, Controller.getOne);

divisiRouter.post("/", authentication, Controller.craete);

divisiRouter.patch("/:id", authentication, Controller.update);

divisiRouter.delete("/:id", authentication, Controller.delete);

module.exports = divisiRouter;
