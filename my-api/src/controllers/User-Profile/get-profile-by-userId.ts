import { RequestHandler } from "express";
import { prisma } from "../../db";

export const getProfileByUserId: RequestHandler = async (req, res) => {
  const userId = parseInt(req.query.userId as string);
  try {
    const profile = await prisma.profile.findFirst({
      where: {
        userId: userId,
      },
    });
    res.status(200).json({ profile });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};
