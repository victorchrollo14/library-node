import { Router } from "express";
import { dataControllers } from "../controller/dataController.js";

const dataRouter = Router();

dataRouter.get("/", (req, res) => {
  dataControllers.getBooksData(res);
});

export { dataRouter };
