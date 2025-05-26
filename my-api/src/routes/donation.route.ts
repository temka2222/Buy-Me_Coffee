import { Router } from "express";
import { CreateDonation } from "../controllers/donations/create-donation";
import { getDonation } from "../controllers/donations/get-donation-by-userId";

export const donationRouter = Router()
  .post("/:userId", CreateDonation)
  .get("/:userId", getDonation);
