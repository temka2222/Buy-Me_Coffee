import { RequestHandler } from "express";
import { prisma } from "../../db";

export const getDonation: RequestHandler = async (req, res) => {
  const userId = parseInt(req.params.userId);
  try {
    const donation = await prisma.donation.findMany({
      where: {
        recipientId: userId,
      },
    });
    res.status(200).json({ donation });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};
