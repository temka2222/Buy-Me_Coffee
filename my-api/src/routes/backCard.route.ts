import { Router } from "express";
import { CreateBankcard } from "../controllers/Bank Account/create-bank-card";
import { getBankCard } from "../controllers/Bank Account/get-BankCard";

export const bankCardRouter = Router()
  .post("/:userId", CreateBankcard)
  .get("/:userId", getBankCard);
