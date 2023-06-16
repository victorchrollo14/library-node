import { Router } from "express";
import { getBooksData } from "../controller/dataController.js";

const dataRouter = Router();

dataRouter.get("/", getBooksData);

export { dataRouter };
