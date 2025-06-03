import { Router } from "express";
import { CreateBankcard } from "../controllers/Bank Account/create-bank-card";
import { getBankCard } from "../controllers/Bank Account/get-BankCard";
import { updateBankCard } from "../controllers/Bank Account/update-bankCard";

export const bankCardRouter = Router()
  .post("/:userId", CreateBankcard)
  .get("/:userId", getBankCard)
  .put("/update/:BankCardId", updateBankCard);
