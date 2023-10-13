const Controller = require("../controller/kegiatan");
const upload = require("../helper/multer");
const ApiKey = require("../middleware/apiKey");
const authentication = require("../middleware/authentication");

const kegiatanRouter = require("express").Router();

const file = upload();

kegiatanRouter.get("/", ApiKey, Controller.getAll);
kegiatanRouter.get("/:id", ApiKey, Controller.getOne);
kegiatanRouter.post(
  "/",
  file.single("gambar_kegiatan"),
  authentication,
  Controller.craete
);

kegiatanRouter.patch(
  "/:id",
  file.single("gambar_kegiatan"),
  authentication,
  Controller.update
);

kegiatanRouter.patch(
  "/status/:id",
  authentication,
  Controller.updateStatusAktif
);

kegiatanRouter.patch(
  "/headline/:id",
  authentication,
  Controller.updateHeadline
);

kegiatanRouter.delete("/:id", authentication, Controller.delete);

module.exports = kegiatanRouter;
