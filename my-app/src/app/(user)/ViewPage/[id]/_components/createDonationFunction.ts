import { api } from "@/app/axios";

import { toast } from "sonner";
import { useUser } from "../../../Home/_components/userValues";

export const CreateDonationFun = async (
  userId: number,
  amount: number,
  specialMessage: string,
  donorId: number,
  socialURLOrBuyMeACoffee: string,

  setLoading: (loading: boolean) => void
) => {
  try {
    setLoading(true);
    await api.post(`/donation/${userId}`, {
      amount,
      specialMessage,
      donorId,
      socialURLOrBuyMeACoffee,
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
