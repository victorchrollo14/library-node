import { Router } from "express";
import { showUserData } from "../controller/profileController.js";

const profileRouter = Router();

profileRouter.get("/", showUserData);

export { profileRouter };
