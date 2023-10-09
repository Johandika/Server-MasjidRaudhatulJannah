const Controller = require("../controller/uangkeluar");
const ApiKey = require("../middleware/ApiKey");
const authentication = require("../middleware/authentication");

const uangKeluarRouter = require("express").Router();

uangKeluarRouter.get("/", ApiKey, Controller.getAll);
uangKeluarRouter.get("/:id", ApiKey, Controller.getOne);
uangKeluarRouter.post("/", authentication, Controller.create);
uangKeluarRouter.patch("/:id", authentication, Controller.update);
uangKeluarRouter.delete("/:id", authentication, Controller.delete);

module.exports = uangKeluarRouter;
