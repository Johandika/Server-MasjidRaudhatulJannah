const Controller = require("../controller/pesertatahsindewasa");
const authentication = require("../middleware/authentication");

const pesertaTahsinDewasaRouter = require("express").Router();

pesertaTahsinDewasaRouter.get("/", authentication, Controller.getAll);

pesertaTahsinDewasaRouter.get("/:id", authentication, Controller.getOne);

pesertaTahsinDewasaRouter.post("/", authentication, Controller.craete);

pesertaTahsinDewasaRouter.patch("/:id", authentication, Controller.update);

pesertaTahsinDewasaRouter.delete("/:id", authentication, Controller.delete);

module.exports = pesertaTahsinDewasaRouter;
