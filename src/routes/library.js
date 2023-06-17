import { Router } from "express";
import { addBookToLibrary } from "../controller/dataController.js";

const libraryRouter = Router();

libraryRouter.get("/", (req, res) => {
  res.render("index");
});

libraryRouter.post("/", (req, res) => {
  console.log(req.body);
  addBookToLibrary(req.body);
  res.redirect("/");
});

export { libraryRouter };
