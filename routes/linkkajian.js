const Controller = require("../controller/linkkajian");
const ApiKey = require("../middleware/apiKey");
const authentication = require("../middleware/authentication");

const linkKajianRouter = require("express").Router();

linkKajianRouter.get("/", ApiKey, Controller.getAll);
linkKajianRouter.get("/kajian/:KajianId", ApiKey, Controller.getAllByKajianId);
linkKajianRouter.get("/:id", ApiKey, Controller.getOne);
linkKajianRouter.post("/", authentication, Controller.create);
linkKajianRouter.patch("/:id", authentication, Controller.update);
linkKajianRouter.delete("/:id", authentication, Controller.delete);

module.exports = linkKajianRouter;
