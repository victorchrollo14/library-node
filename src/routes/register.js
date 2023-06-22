import { Router } from "express";
import { userSignUp } from "../controller/userController.js";

const regRouter = Router();

regRouter.get("/register", (req, res) => {
  res.render("register");
});

regRouter.post("/register", userSignUp);

export { regRouter };
