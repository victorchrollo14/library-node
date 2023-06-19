import { Router } from "express";
import { addBookToLibrary, removeBook } from "../controller/dataController.js";

const libraryRouter = Router();

libraryRouter.get("/", (req, res) => {
  res.render("index");
});

libraryRouter.post("/", (req, res) => {
  addBookToLibrary(req.body);
  res.redirect("/");
});

libraryRouter.delete("/", async (req, res) => {
  await removeBook(req.body);
  res.status(200).json({ message: "Book Deleted sucessfully" });
});

export { libraryRouter };
