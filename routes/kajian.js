const Controller = require("../controller/kajian");
const upload = require("../helper/multer");
const ApiKey = require("../middleware/ApiKey");
const authentication = require("../middleware/authentication");

const kajianRouter = require("express").Router();

const file = upload();

kajianRouter.get("/rutin", ApiKey, Controller.getAllRutin);
kajianRouter.get("/tablighAkbar", ApiKey, Controller.getAllTablighAkbar);

kajianRouter.get("/:id", authentication, Controller.getOne);

kajianRouter.post(
  "/",
  file.single("poster_kajian"),
  authentication,
  Controller.craete
);

kajianRouter.patch(
  "/:id",
  file.single("poster_kajian"),
  authentication,
  Controller.update
);

kajianRouter.delete("/:id", authentication, Controller.delete);

module.exports = kajianRouter;
