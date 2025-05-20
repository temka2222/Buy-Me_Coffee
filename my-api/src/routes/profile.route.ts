import { Router } from "express";
import { CreateProfile } from "../controllers/User-Profile/create-profile";

export const profileRouter = Router().post("/:userId", CreateProfile);
