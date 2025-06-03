import { api } from "@/app/axios";

import { toast } from "sonner";

export const getProfile = async (id: number) => {
  try {
    const response = await api.get(`/profile?userId=${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    {
      toast.error("error!");
    }
  }
};
