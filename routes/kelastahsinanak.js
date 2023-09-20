const Controller = require("../controller/kelastahsinanak");
const authentication = require("../middleware/authentication");

const kelasTahsinAnakRouter = require("express").Router();

kelasTahsinAnakRouter.get("/", authentication, Controller.getAll);

kelasTahsinAnakRouter.get("/:id", authentication, Controller.getOne);

kelasTahsinAnakRouter.post("/", authentication, Controller.craete);

kelasTahsinAnakRouter.patch("/:id", authentication, Controller.update);

kelasTahsinAnakRouter.delete("/:id", authentication, Controller.delete);

module.exports = kelasTahsinAnakRouter;
