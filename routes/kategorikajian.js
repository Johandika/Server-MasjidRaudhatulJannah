const Controller = require("../controller/kategorikajian");
const ApiKey = require("../middleware/ApiKey");
const authentication = require("../middleware/authentication");

const kategoriKajianRouter = require("express").Router();

kategoriKajianRouter.get("/", ApiKey, Controller.getAll);

kategoriKajianRouter.get("/:id", ApiKey, Controller.getOne);

kategoriKajianRouter.post("/", authentication, Controller.craete);

kategoriKajianRouter.patch("/:id", authentication, Controller.update);

kategoriKajianRouter.delete("/:id", authentication, Controller.delete);

module.exports = kategoriKajianRouter;
