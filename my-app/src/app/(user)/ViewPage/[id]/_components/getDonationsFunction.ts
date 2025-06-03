import { api } from "@/app/axios";

export const getDonations = async (userId: number) => {
  try {
    const response = await api.get(`/donation/${userId}`);
    return response.data.donation;
  } catch (error) {
    console.error("Error", error);
    return null;
  }
};
