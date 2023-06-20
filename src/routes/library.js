import { Router } from "express";
import { dataControllers } from "../controller/dataController.js";

const libraryRouter = Router();

libraryRouter.get("/", (req, res) => {
  res.render("index");
});

libraryRouter.post("/", (req, res) => {
  dataControllers.addBookToLibrary(req.body);
  res.redirect("/");
});

libraryRouter.delete("/", async (req, res) => {
  await dataControllers.removeBook(req.body);
  res.status(200).json({ message: "Book Deleted sucessfully" });
});

libraryRouter.patch("/:id", async (req, res) => {
  await dataControllers.updateBook(req.params.id, req.body);
  res.status(200).json({ message: "Book Updated" });
});

export { libraryRouter };
