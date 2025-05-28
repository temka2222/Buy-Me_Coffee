import { RequestHandler } from "express";
import { prisma } from "../../db";
export const CreateDonation: RequestHandler = async (req, res) => {
  const userId = parseInt(req.params.userId);
  const {
    amount,
    specialMessage,
    donorId,
    socialURLOrBuyMeACoffee,
    createdAt,
    updatedAt,
  } = req.body;

  try {
    const donation = await prisma.donation.create({
      data: {
        amount,
        recipientId: userId,
        donorId: donorId ? Number(donorId) : 1,
        socialURLOrBuyMeACoffee,
        ...(specialMessage && { specialMessage }),
        createdAt,
        updatedAt,
      },
    });

    res.status(200).json(donation);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
