import { Router } from "express";
import { userLogin } from "../controller/userController.js";
const loginRouter = Router();

loginRouter.get("/", (req, res) => {
  res.render("login");
});

loginRouter.post("/", userLogin);

export { loginRouter };
