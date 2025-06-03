import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../../db";

export const updateBankCard: RequestHandler = async (req, res) => {
  try {
    const BankCardId = parseInt(req.params.BankCardId);
    const { country, firstname, lastName, cardNumber, expiryDate } = req.body;
    const BankCard = await prisma.bankcard.findUnique({
      where: { id: BankCardId },
    });

    if (!BankCard) {
      res.status(404).json({ message: "BankCard not found" });
      return;
    }

    await prisma.bankcard.update({
      where: { id: BankCardId },
      data: {
        country,
        firstname,
        lastName,
        cardNumber,
        expiryDate: new Date(expiryDate),
        updatedAt: new Date(),
      },
    });

    res.status(200).json({ message: "Амжилттай шинэчиллээ" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
