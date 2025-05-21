import { prisma } from "../../db";

export const updateProfile = async (req, res) => {
  const profileId = parseInt(req.params.profileId);
  const {
    name,
    about,
    avatarImage,
    socialMediaURL,
    successMessage,
    backgroundImage,
  } = req.body;

  try {
    await prisma.profile.update({
      where: { id: profileId },
      data: {
        name,
        about,
        avatarImage,
        socialMediaURL,
        successMessage,
        backgroundImage,
        updatedAt: new Date(),
      },
    });

    return res.status(200).json({ message: "amjilttai" });
  } catch (error) {
    return res.status(500).json({ message: "server error", error });
  }
};
