const Controller = require("../controller/uangkeluar");
const authentication = require("../middleware/authentication");

const uangKeluarRouter = require("express").Router();

uangKeluarRouter.get("/", authentication, Controller.getAll);
uangKeluarRouter.get("/:id", authentication, Controller.getOne);
uangKeluarRouter.post("/", authentication, Controller.create);
uangKeluarRouter.patch("/:id", authentication, Controller.update);
uangKeluarRouter.delete("/:id", authentication, Controller.delete);

module.exports = uangKeluarRouter;
