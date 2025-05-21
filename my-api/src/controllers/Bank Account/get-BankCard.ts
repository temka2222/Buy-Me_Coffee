import { RequestHandler } from "express";
import { prisma } from "../../db";

export const getBankCard: RequestHandler = async (req, res) => {
  const userId = parseInt(req.params.userId);
  try {
    const bankCard = await prisma.bankcard.findFirst({
      where: {
        userId: userId,
      },
    });
    res.status(200).json({ bankCard });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};
