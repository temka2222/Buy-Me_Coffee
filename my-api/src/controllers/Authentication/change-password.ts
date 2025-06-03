import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../../db";

export const updatePassword: RequestHandler = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const { password } = req.body;
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
      },
    });

    res.status(200).json({ message: "Амжилттай шинэчиллээ" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
