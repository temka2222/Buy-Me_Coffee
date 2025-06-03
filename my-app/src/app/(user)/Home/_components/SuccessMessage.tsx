import { api } from "@/app/axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import { useUser } from "./userValues";
import { useState } from "react";
import { Loader } from "lucide-react";
import { toast } from "sonner";
type FormData = {
  message: string;
};
export const SuccessMessage = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      message: user?.profile?.successMessage ?? "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      await api.put(`/profile/${user?.profile.id}`, {
        successMessage: data.message,
      });
      toast.success("Success message saved!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save success message");
    } finally {
      setLoading(false);
    }
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
          <Button
            type="submit"
            className={`flex  justify-center items-center text-white border-solid border pr-8 pl-8 rounded-sm p-2 
                 `}
          >
            {loading ? <Loader className="animate-spin" /> : "Save changes"}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};
