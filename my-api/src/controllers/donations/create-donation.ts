import { RequestHandler } from "express";
import { prisma } from "../../db";
export const CreateDonation: RequestHandler = async (req, res) => {
  const userId = parseInt(req.params.userId);
  const { amount, specialMessage, donorID, socialURLOrBuyMeACoffee } = req.body;

  try {
    const donation = await prisma.donation.create({
      data: {
        amount,
        specialMessage,
        recipientId: userId,
        donorId: donorID ? parseInt(donorID) : 21,
        socialURLOrBuyMeACoffee,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    res.status(200).json(donation);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
