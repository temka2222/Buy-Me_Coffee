import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
type FormData = {
  message: string;
};
export const SuccessMessage = () => {
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      message: `Thank you for supporting me! It means a lot to have your support.It’s a step toward creating a more inclusive and accepting community of artists.`,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form data:", data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent className="flex flex-col gap-4 ">
          <p className="font-bold">Success page</p>
          <div>
            <Label className="font-medium">Confirmation message</Label>
            <Textarea className="text-left" {...register("message")} />
          </div>
          <Button type="submit">Save changes</Button>
        </CardContent>
      </Card>
    </form>
  );
};
