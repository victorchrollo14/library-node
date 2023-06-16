import { Router } from "express";
import { getBooksData } from "../controller/dataController.js";

const dataRouter = Router();

dataRouter.get("/", (req, res) => {
  getBooksData(res);
});

export { dataRouter };
