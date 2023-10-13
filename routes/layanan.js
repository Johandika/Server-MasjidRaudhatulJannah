const layananRouter = require("express").Router();

const Controller = require("../controller/layanan");
const upload = require("../helper/multer");
const ApiKey = require("../middleware/ApiKey");

const authentication = require("../middleware/authentication");

const file = upload();

layananRouter.get("/", ApiKey, Controller.getAll);
layananRouter.get("/:id", ApiKey, Controller.getOne);
layananRouter.post(
  "/",
  file.single("gambar_layanan"),
  authentication,
  Controller.create
);

layananRouter.patch(
  "/:id",
  file.single("gambar_layanan"),
  authentication,
  Controller.update
);

layananRouter.patch(
  "/status/:id",
  authentication,
  Controller.updateStatusAktif
);

layananRouter.delete("/:id", authentication, Controller.delete);

module.exports = layananRouter;
