import { Router } from "express";
import { CreateProfile } from "../controllers/User-Profile/create-profile";
import { getProfileByUserId } from "../controllers/User-Profile/get-profile-by-userId";
import { updateProfile } from "../controllers/User-Profile/update-profile-by-Id";

export const profileRouter = Router()
  .post("/:userId", CreateProfile)
  .get("/", getProfileByUserId)
  .put("/:profileId", updateProfile);
