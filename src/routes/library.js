import { Router } from "express";
import logger from "morgan";

const libraryRouter = Router();

libraryRouter.get("/", (req, res) => {
  res.render("index");
});


export { libraryRouter };
