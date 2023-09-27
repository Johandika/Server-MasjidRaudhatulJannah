const Controller = require("../controller/diklat");
const upload = require("../helper/multer");
const authentication = require("../middleware/authentication");

const diklatRouter = require("express").Router();

const file = upload();

diklatRouter.get("/", authentication, Controller.getAll);

diklatRouter.get("/:id", authentication, Controller.getOne);

diklatRouter.post(
  "/",
  file.single("poster_diklat"),
  authentication,
  Controller.craete
);

diklatRouter.patch(
  "/:id",
  file.single("poster_diklat"),
  authentication,
  Controller.update
);

diklatRouter.delete("/:id", authentication, Controller.delete);

module.exports = diklatRouter;
