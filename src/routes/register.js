import { Router } from "express";

const regRouter = Router();

regRouter.get("/", (req, res) => {
  res.render("register");
});

export { regRouter };
