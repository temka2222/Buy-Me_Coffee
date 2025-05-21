import { RequestHandler } from "express";
import { prisma } from "../../db";
export const CreateBankcard: RequestHandler = async (req, res) => {
  const userId = parseInt(req.params.userId);
  const { country, firstname, lastName, cardNumber, expiryDate } = req.body;
  try {
    const profile = await prisma.bankcard.create({
      data: {
        country,
        userId: userId,
        firstname,
        lastName,
        cardNumber,
        expiryDate: new Date(expiryDate),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
