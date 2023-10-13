const Controller = require("../controller/pesertadiklat");
const upload = require("../helper/multer");
const ApiKey = require("../middleware/ApiKey");
const authentication = require("../middleware/authentication");

const pesertaDiklatRouter = require("express").Router();

const file = upload();

pesertaDiklatRouter.get("/", ApiKey, Controller.getAll);

pesertaDiklatRouter.get("/:id", ApiKey, Controller.getOne);

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

pesertaDiklatRouter.patch(
  "/pembayaran/:id",
  authentication,
  Controller.updateStatusPembayaran
);

pesertaDiklatRouter.patch(
  "/status/:id",
  authentication,
  Controller.updateStatusAktif
);

pesertaDiklatRouter.delete("/:id", authentication, Controller.delete);

module.exports = pesertaDiklatRouter;
