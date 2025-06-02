import { api } from "@/app/axios";

import { toast } from "sonner";

export const updateProfile = async (
  profileId: number,
  name: string,
  about: string,
  avatarImage: string,
  socialMediaURL: string,
  setLoading: (loading: boolean) => void
) => {
  try {
    await api.put(`/profile/${profileId}`, {
      name,
      about,
      avatarImage,
      socialMediaURL,
    });
    toast.success("success!");
  } catch (error) {
    {
      toast.error("error!");
    }
  } finally {
    setLoading(false);
  }
};
