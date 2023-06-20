import { Router } from "express";
import { userSignUp } from "../controller/userController.js";

const regRouter = Router();

regRouter.get("/", (req, res) => {
  res.render("register");
});

regRouter.post("/", userSignUp);

export { regRouter };
