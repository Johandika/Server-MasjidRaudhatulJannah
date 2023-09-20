const Controller = require("../controller/kategorikajian");
const authentication = require("../middleware/authentication");

const kategoriKajianRouter = require("express").Router();

kategoriKajianRouter.get("/", authentication, Controller.getAll);

kategoriKajianRouter.get("/:id", authentication, Controller.getOne);

kategoriKajianRouter.post("/", authentication, Controller.craete);

kategoriKajianRouter.patch("/:id", authentication, Controller.update);

kategoriKajianRouter.delete("/:id", authentication, Controller.delete);

module.exports = kategoriKajianRouter;
