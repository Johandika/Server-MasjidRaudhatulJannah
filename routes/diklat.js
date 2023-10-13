const Controller = require("../controller/diklat");
const upload = require("../helper/multer");
const ApiKey = require("../middleware/ApiKey");
const authentication = require("../middleware/authentication");

const diklatRouter = require("express").Router();

const file = upload();

diklatRouter.get("/", ApiKey, Controller.getAll);

diklatRouter.get("/:id", ApiKey, Controller.getOne);

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

diklatRouter.patch("/status/:id", authentication, Controller.updateStatusAktif);

diklatRouter.delete("/:id", authentication, Controller.delete);

module.exports = diklatRouter;
