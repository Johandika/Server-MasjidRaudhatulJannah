const Controller = require("../controller/hari");
const authentication = require("../middleware/authentication");

const hariRouter = require("express").Router();

hariRouter.get("/", authentication, Controller.getAll);

module.exports = hariRouter;
