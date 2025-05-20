import { RequestHandler } from "express";
import { prisma } from "../../db";

export const getMe: RequestHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await prisma.user.findFirst({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
        updatedAt: true,
        profile: true,
        bankCard: true,
        donations: true,
      },
      include: {
        profile: true,
        bankCard: true,
      },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
