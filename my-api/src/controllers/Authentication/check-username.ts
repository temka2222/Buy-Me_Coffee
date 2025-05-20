import { RequestHandler } from "express";
import { prisma } from "../../db";
declare global {
  namespace Express {
    interface Request {
      isExist?: boolean;
      username?: string;
    }
  }
}
export const checkUsername: RequestHandler = async (req, res, next) => {
  const { username } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: { username },
    });
    if (user) {
      res.status(200).json({ isExist: true });
      return;
    }

    req.isExist = false;
    req.username = username;
    next();
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};
