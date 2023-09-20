const Controller = require("../controller/pesertatahsinanak");
const authentication = require("../middleware/authentication");

const pesertaTahsinAnakRouter = require("express").Router();

pesertaTahsinAnakRouter.get("/", authentication, Controller.getAll);

pesertaTahsinAnakRouter.get("/:id", authentication, Controller.getOne);

pesertaTahsinAnakRouter.post("/", authentication, Controller.craete);

pesertaTahsinAnakRouter.patch("/:id", authentication, Controller.update);

pesertaTahsinAnakRouter.delete("/:id", authentication, Controller.delete);

module.exports = pesertaTahsinAnakRouter;
