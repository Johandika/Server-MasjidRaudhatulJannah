const Controller = require("../controller/pesertadiklat");
const upload = require("../helper/multer");
const authentication = require("../middleware/authentication");

const pesertaDiklatRouter = require("express").Router();

const file = upload();

pesertaDiklatRouter.get("/", authentication, Controller.getAll);
pesertaDiklatRouter.get("/:id", authentication, Controller.getOne);
pesertaDiklatRouter.post(
  "/",
  file.single("file_bukti_pembayaran"),
  authentication,
  Controller.craete
);
pesertaDiklatRouter.patch(
  "/:id",
  file.single("file_bukti_pembayaran"),
  authentication,
  Controller.update
);
pesertaDiklatRouter.delete("/:id", authentication, Controller.delete);

module.exports = pesertaDiklatRouter;
