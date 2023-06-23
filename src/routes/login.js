import { Router } from "express";
import { userLogin, userLogout, checkLogin } from "../controller/userController.js";

const loginRouter = Router();

loginRouter.get("/login", (req, res) => {
  res.render("login");
});

loginRouter.post("/login", userLogin);

loginRouter.post("/logout", userLogout);

loginRouter.post("/check-login", checkLogin);

export { loginRouter };
