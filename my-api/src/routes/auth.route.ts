import { Router } from "express";
import { authenticationMiddleware } from "../middlewares/authentication-middleware";
import { getMe } from "../controllers/Authentication/get-me";
import { checkUsername } from "../controllers/Authentication/check-username";
import { signUp } from "../controllers/Authentication/sign-up";
import { signIn } from "../controllers/Authentication/sign-in";
import { updatePassword } from "../controllers/Authentication/change-password";

export const authRouter = Router()
  .get("/me", authenticationMiddleware, getMe)
  .post("/signin", signIn)
  .post("/checkname", checkUsername)
  .post("/signup", signUp)
  .put("/update/:userId", updatePassword);
