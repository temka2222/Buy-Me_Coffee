import { useUser } from "@/app/(user)/Home/_components/userValues";
import { api } from "@/app/axios";
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
  const [errorMessage, setErrorMessage] = useState("");
  const checkUsername = async (username: string) => {
    const res = await api.post("/auth/checkname", {
      username,
    });
    console.log(res.data.isExist);
    if (res.data.isExist == true) {
      setErrorMessage("The username is already taken");
    } else {
      {
        setErrorMessage("Username available");
        setUsername(username);
      }
    }
  };
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      username: "",
    },
  });

  const { handleSubmit, control, formState } = form;

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
          onSubmit={form.handleSubmit(() => setStep(2))}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field: { onChange, ...rest } }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter username here"
                    onChange={(event) => {
                      const value = event.target.value;
                      onChange(event);
                      checkUsername(value);
                    }}
                    {...rest}
                  />
                </FormControl>

                {form.formState.isValid ? (
                  <p
                    className={`${
                      errorMessage === "The username is already taken"
                        ? "text-red-400"
                        : "text-green-300"
                    }`}
                  >
                    {errorMessage}
                  </p>
                ) : (
                  ""
                )}

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={errorMessage !== "Username available"}
            type="submit"
            className={`flex justify-center items-center text-white border-solid border pr-8 pl-8 rounded-sm p-2 
                ${
                  errorMessage === "Username available"
                    ? "bg-black"
                    : "bg-[#cccbcc]"
                } `}
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
