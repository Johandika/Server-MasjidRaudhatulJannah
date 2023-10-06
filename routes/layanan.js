const layananRouter = require("express").Router();

const Controller = require("../controller/layanan");
const upload = require("../helper/multer");

const authentication = require("../middleware/authentication");

const file = upload();

layananRouter.get("/", authentication, Controller.getAll);
layananRouter.get("/:id", authentication, Controller.getOne);
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

layananRouter.delete("/:id", authentication, Controller.delete);

module.exports = layananRouter;
