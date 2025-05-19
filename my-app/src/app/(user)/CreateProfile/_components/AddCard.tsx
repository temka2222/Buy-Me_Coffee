import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { StepPropsType } from "./ProfileInfo";
import { formatCardNumber, months, useSelectCountry, years } from "./SelectData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type UserBankCardInfoType = {
  country: string;
  firstName: string;
  lastName: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;
};
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
export const AddPaymentCardInfo = ({ setStep }: StepPropsType) => {
  const [userBankCardInfo, setUserBankCardInfo] =
    useState<UserBankCardInfoType>();
  const { countries } = useSelectCountry();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      country: "",
      firstName: "",
      lastName: "",
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvc: "",
    },
  });
  const { handleSubmit, control, formState } = form;
  const onSubmit = (data: FormData) => {
   setUserBankCardInfo(data)

  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" w-[25%]  flex flex-col gap-4 "
      >
        <FormDescription className="flex flex-col">
          <span className="font-medium text-2xl text-black">
            How would you like to be paid?
          </span>
          <span className="text-[#71717A] text-sm">
            Enter location and payment details
          </span>
        </FormDescription>
        <FormField 
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Select country</FormLabel>
              <Select  onValueChange={field.onChange} defaultValue={field.value} >
                <FormControl className="w-full">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {countries.map((item,countrryIndex)=>{
                    return <SelectItem key={countrryIndex}  value={item.country}>{item.country}</SelectItem>

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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {months.map((month,monthIndex)=>{
                    return <SelectItem key={monthIndex} value={month}>{month}</SelectItem>

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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {years.map((year,yearIndex)=>{
                    return <SelectItem key={yearIndex} value={String(year)}>{year}</SelectItem>
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
        <div className="w-ful flex flex-col items-end">
          <Button
            disabled={formState.isSubmitting || !formState.isValid}
            type="submit"
            className={`flex w-[50%] justify-center items-center text-white border-solid border pr-8 pl-8 rounded-sm p-2 
                ${
                  formState.isSubmitting || !formState.isValid
                    ? "bg-[#cccbcc]"
                    : "bg-black"
                } `}
          >
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
};
