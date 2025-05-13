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

const schema = z.object({
  username: z
    .string()
    .min(5, { message: "Username must be at least 5 characters" }),
});

type FormData = z.infer<typeof schema>;

type SignUpStepOneProps = {
  setStep: (value: number) => void;
  setUsername: (value: string) => void;
};

export const SignUpStepOne = ({ setStep, setUsername }: SignUpStepOneProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      username: "",
    },
  });
  const { handleSubmit, control, formState } = form;
  const onSubmit = (data: FormData) => {
    setUsername(data.username);
    setStep(2);
  };

  return (
    <div className=" w-[40%] flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <p className="font-medium text-xl">Create Your Account</p>
        <p className="text-[#71717A] text-sm">
          Choose a username for your page
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter username here" {...field} />
                </FormControl>
                {formState.isValid ? (
                  <p className="text-green-300">Username available</p>
                ) : (
                  ""
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={formState.isSubmitting || !formState.isValid}
            type="submit"
            className={`flex justify-center items-center text-white border-solid border pr-8 pl-8 rounded-sm p-2 
                ${
                  formState.isSubmitting || !formState.isValid
                    ? "bg-[#cccbcc]"
                    : "bg-black"
                } `}
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
