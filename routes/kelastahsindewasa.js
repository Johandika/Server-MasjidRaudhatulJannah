const Controller = require("../controller/kelastahsindewasa");
const ApiKey = require("../middleware/ApiKey");
const authentication = require("../middleware/authentication");

const kelasTahsinDewasaDewasa = require("express").Router();

kelasTahsinDewasaDewasa.get("/", ApiKey, Controller.getAll);

kelasTahsinDewasaDewasa.get("/:id", ApiKey, Controller.getOne);

kelasTahsinDewasaDewasa.post("/", authentication, Controller.craete);

kelasTahsinDewasaDewasa.patch("/:id", authentication, Controller.update);

kelasTahsinDewasaDewasa.delete("/:id", authentication, Controller.delete);

module.exports = kelasTahsinDewasaDewasa;
