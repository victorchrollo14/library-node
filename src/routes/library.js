import { Router } from "express";
import { dataControllers } from "../controller/dataController.js";

const libraryRouter = Router();

libraryRouter.get("/", (req, res) => {
  res.render("index");
});

libraryRouter.post("/", dataControllers.addBookToLibrary);
libraryRouter.delete("/:id", dataControllers.removeBook);
libraryRouter.patch("/:id", dataControllers.updateBook);

export { libraryRouter };
