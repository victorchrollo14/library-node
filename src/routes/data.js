import { Router } from "express";
import { dataControllers } from "../controller/dataController.js";

const dataRouter = Router();

dataRouter.get("/", dataControllers.getBooksData);

export { dataRouter };
