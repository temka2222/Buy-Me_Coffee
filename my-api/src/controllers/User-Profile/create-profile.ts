import { RequestHandler } from "express";
import { prisma } from "../../db";
export const CreateProfile: RequestHandler = async (req, res) => {
  const userId = parseInt(req.params.userId);
  const {
    name,
    about,
    avatarImage,
    socialMediaURL,
    backgroundImage,
    successMessage,
  } = req.body;

  try {
    const profile = await prisma.profile.create({
      data: {
        name,
        about,
        avatarImage,
        socialMediaURL,
        userId,
        backgroundImage,
        successMessage,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
