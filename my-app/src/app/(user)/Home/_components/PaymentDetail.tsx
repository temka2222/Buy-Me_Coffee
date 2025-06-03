import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useUser } from "../../Home/_components/userValues";
import { toast } from "sonner";
import {
  cardNumberValue,
  formatCardNumber,
  months,
  useSelectCountry,
  years,
} from "../../CreateProfile/_components/SelectData";
import { Card, CardContent } from "@/components/ui/card";
import { updateBankCardFunction } from "./updateBanckcardFunction";
import { getMonth } from "date-fns";

const schema = z.object({
  country: z.string().min(1, { message: "Select country to continue" }),
  firstName: z.string().min(1, { message: "First name must match" }),
  lastName: z.string().min(1, { message: "First name must match" }),

  cardNumber: z
    .string()
    .min(16, { message: "Card number must be at least 16 digits" })
    .max(19, { message: "Card number must be at most 19 digits" })
    .refine((val) => /^\d{16,19}$/.test(val.replace(/-/g, "")), {
      message: "Card number must contain only digits",
    }),

  expiryMonth: z.string().min(1, { message: "First name must match" }),
  expiryYear: z.string().min(1, { message: "First name must match" }),
  cvc: z.string().min(1, { message: "First name must match" }),
});

type FormData = z.infer<typeof schema>;
export const PaymentDetail = () => {
  const { countries } = useSelectCountry();
  const { setLoading, user } = useUser();
  const defaultValues = useMemo(() => {
    let expiryMonth = "";
    let expiryYear = "";

    if (user?.bankCard?.expiryDate) {
      const expiryDate = new Date(user.bankCard.expiryDate);
      expiryMonth = String(getMonth(expiryDate) + 1);
      expiryYear = String(expiryDate.getFullYear());
    }

    return {
      country: user?.bankCard?.country ?? "",
      firstName: user?.bankCard?.firstname ?? "",
      lastName: user?.bankCard?.lastName ?? "",
      cardNumber: user?.bankCard?.cardNumber
        ? formatCardNumber(user.bankCard.cardNumber)
        : "",
      expiryMonth,
      expiryYear,
      cvc: "",
    };
  }, [user]);
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues,
  });
  const onSubmit = async (data: FormData) => {
    const cardValue = cardNumberValue(data.cardNumber);
    const lastDay = new Date(
      parseInt(data.expiryYear),
      parseInt(data.expiryMonth),
      0
    ).getDate();
    const expiryDate = new Date(
      parseInt(data.expiryYear),
      parseInt(data.expiryMonth) - 1,
      lastDay
    );
    if (!user) {
      toast.error("User not found!");
      return;
    } else
      await updateBankCardFunction(
        data.country,
        data.firstName,
        data.lastName,
        cardValue,
        expiryDate,
        user.bankCard.id,
        setLoading
      );
  };

  return (
    <Card>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" w-full  flex flex-col gap-4 "
          >
            <p className="font-bold text-black">Payment details</p>

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Select country</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries.map((item, countrryIndex) => {
                        return (
                          <SelectItem key={countrryIndex} value={item.country}>
                            {item.country}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row gap-6 justify-between">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Enter first name</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        type="text"
                        placeholder="Enter name here"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Enter last name</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        type="text"
                        placeholder="Enter your name here"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter card number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="XXXX-XXXX-XXXX-XXXX"
                      {...field}
                      value={field.value}
                      onChange={(e) => {
                        const formatted = formatCardNumber(e.target.value);
                        field.onChange(formatted);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row gap-6 justify-between">
              <FormField
                control={form.control}
                name="expiryMonth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expires</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {months.map((month, monthIndex) => {
                          return (
                            <SelectItem
                              key={monthIndex}
                              value={String(monthIndex + 1)}
                            >
                              {month}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expiryYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {years.map((year, yearIndex) => {
                          return (
                            <SelectItem key={yearIndex} value={String(year)}>
                              {year}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cvc"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>CVC</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        type="text"
                        placeholder="CVC"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex flex-col items-end">
              <Button
                type="submit"
                className={`flex w-full justify-center items-center text-white border-solid border pr-8 pl-8 rounded-sm p-2 
                 `}
              >
                Save changes
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
