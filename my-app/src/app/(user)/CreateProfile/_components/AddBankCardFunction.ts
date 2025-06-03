import { api } from "@/app/axios";

import { toast } from "sonner";

export const AddBankCardFunction = async (
  country: string,
  firstname: string,
  lastName: string,
  cardNumber: string,
  expiryDate: Date,
  userId: number,
  setLoading: (loading: boolean) => void
) => {
  try {
    setLoading(true);
    await api.post(`/bankcard/${userId}`, {
      country,
      firstname,
      lastName,
      cardNumber,
      expiryDate,
    });
    toast.success("success!");
  } catch (error) {
    console.error(error);
    {
      toast.error("error!");
    }
  } finally {
    setLoading(false);
  }
};
