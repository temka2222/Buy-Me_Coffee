"use client";
import { useUser } from "@/app/(user)/Home/_components/userValues";
import { api } from "@/app/axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { Loader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z
  .object({
    newPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, {
        message: "Password must include at least one letter and one number.",
      }),
    confirmPassword: z.string().min(1, { message: "Insert password" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match. Please try again.",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export const SetPassword = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      await api.put(`/auth/update/${user?.id}`, {
        password: data.newPassword,
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

  return (
    <Card>
      <CardContent>
        <div className=" relative w-full h-full flex flex-col justify-center items-center">
          <div className="  w-full flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <p className="font-bold">Set a new password</p>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New password</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter email here " {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
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
                  type="submit"
                  className={`flex justify-center items-center text-white border-solid border pr-8 pl-8 rounded-sm p-2 
             `}
                >
                  {loading ? (
                    <Loader className="animate-spin" />
                  ) : (
                    "Save changes"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
