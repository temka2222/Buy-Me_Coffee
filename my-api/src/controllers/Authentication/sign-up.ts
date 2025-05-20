import { RequestHandler } from "express";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../../db";

export const signUp: RequestHandler = async (req, res) => {
  const { password, email } = req.body;
  const isExist = req.isExist;
  const username = req.username;
  try {
    if (isExist) {
      res.status(400).json({ message: "Username already taken" });
      return;
    }
    const existingEmail = await prisma.user.findFirst({
      where: { email },
    });
    if (existingEmail) {
      res.status(400).json({ message: "Имэйл бүртгэлтэй байна" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
      },
    });

    const { password: userPassword, ...userWithoutPassword } = newUser;
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      process.env.JWT_SECRET
    );
    res.status(200).json({ user: userWithoutPassword, token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
