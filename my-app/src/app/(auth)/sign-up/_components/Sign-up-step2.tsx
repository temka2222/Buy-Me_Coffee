import { useUser } from "@/app/(user)/Home/_components/userValues";
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
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Insert email" })
    .email({ message: "Please provide a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, {
      message: "Password must include at least one letter and one number.",
    }),
});

type FormData = z.infer<typeof schema>;

type SignUpStepTwoProps = {
  setStep: (value: number) => void;
  username: string;
};

export const SignUpStepTwo = ({ setStep, username }: SignUpStepTwoProps) => {
  const { signUp } = useUser();
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { formState } = form;
  const onSubmit = (data: FormData) => {
    setStep(3);
    signUp(data.email, data.password, username);
  };

  return (
    <div className=" w-[40%] flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <p className="font-medium text-xl">Welcome, {username}</p>
        <p className="text-[#71717A] text-sm">
          Connect email and set a password
        </p>
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
    </div>
  );
};
