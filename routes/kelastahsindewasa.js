const Controller = require("../controller/kelastahsindewasa");
const authentication = require("../middleware/authentication");

const kelasTahsinDewasaDewasa = require("express").Router();

kelasTahsinDewasaDewasa.get("/", authentication, Controller.getAll);

kelasTahsinDewasaDewasa.get("/:id", authentication, Controller.getOne);

kelasTahsinDewasaDewasa.post("/", authentication, Controller.craete);

kelasTahsinDewasaDewasa.patch("/:id", authentication, Controller.update);

kelasTahsinDewasaDewasa.delete("/:id", authentication, Controller.delete);

module.exports = kelasTahsinDewasaDewasa;
