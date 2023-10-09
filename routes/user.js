const Controller = require("../controller/user");
const ApiKey = require("../middleware/ApiKey");
const authentication = require("../middleware/authentication");

const userRouter = require("express").Router();

userRouter.get("/", authentication, Controller.getAllUser);

userRouter.get("/:id", authentication, Controller.getOneUser);

userRouter.post("/register", ApiKey, Controller.register);

userRouter.post("/login", ApiKey, Controller.login);

userRouter.patch("/:id", authentication, Controller.updateUser);

userRouter.delete("/:id", authentication, Controller.deleteUser);

module.exports = userRouter;
