import { Router } from "express";
import { userLogin } from "../controller/userController.js";
import { userLogout } from "../controller/userController.js";

const loginRouter = Router();

loginRouter.get("/login", (req, res) => {
  res.render("login");
});

loginRouter.post("/login", userLogin);

loginRouter.post("/logout", userLogout);

export { loginRouter };
