"use client";
import { useUser } from "@/app/(user)/Home/_components/userValues";
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Insert email" })
    .email({ message: "Please provide a valid email address." }),
  password: z.string().min(1, { message: "Insert password" }),
});

type FormData = z.infer<typeof schema>;

export default function Home() {
  const { signIn } = useUser();
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { handleSubmit, control, formState } = form;
  const onSubmit = async (data: FormData) => {
    await signIn(data.email, data.password);
  };

  return (
    <div className=" relative w-full h-full flex flex-col justify-center items-center">
      <div className="  w-[40%] flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <p className="font-medium text-xl">Welcome back</p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email here" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter password here"
                      {...field}
                    />
                  </FormControl>

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
        <Button
          onClick={() => {
            router.push("./sign-up");
          }}
          className="absolute top-5 right-5 "
        >
          Sign out
        </Button>
      </div>
    </div>
  );
}
