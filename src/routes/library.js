import { Router } from "express";

const libraryRouter = Router();

libraryRouter.get("/", (req, res) => {
  res.render("index");
});

export { libraryRouter };
