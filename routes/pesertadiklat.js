const Controller = require("../controller/pesertadiklat");
const authentication = require("../middleware/authentication");

const pesertaDiklatRouter = require("express").Router();

pesertaDiklatRouter.get("/", authentication, Controller.getAll);
pesertaDiklatRouter.get("/:id", authentication, Controller.getOne);
pesertaDiklatRouter.post("/", authentication, Controller.craete);
pesertaDiklatRouter.patch("/:id", authentication, Controller.update);
pesertaDiklatRouter.delete("/", authentication, Controller.delete);

module.exports = pesertaDiklatRouter;
