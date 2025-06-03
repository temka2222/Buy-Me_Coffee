import { api } from "@/app/axios";

import { toast } from "sonner";

export const updateBankCardFunction = async (
  country: string,
  firstname: string,
  lastName: string,
  cardNumber: string,
  expiryDate: Date,
  BankCardId: number,
  setLoading: (loading: boolean) => void
) => {
  try {
    setLoading(true);
    await api.put(`/bankcard/update/${BankCardId}`, {
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
