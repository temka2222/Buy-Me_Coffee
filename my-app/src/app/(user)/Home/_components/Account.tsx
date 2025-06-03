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
import { Camera, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUser } from "../../Home/_components/userValues";
import { uploadImage } from "../../CreateProfile/_components/uploadImageFunction";
import { updateProfile } from "./updateProfileFunction";
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export type StepPropsType = {
  setStep: (value: number) => void;
};

const schema = z.object({
  img: z.any({ message: "Please enter image" }).refine((file) => {
    if (!file || file.length === 0) return false;
    if (!file[0]) return false;
    return ACCEPTED_IMAGE_TYPES.includes(file[0].type);
  }, "Only .jpg, .jpeg, .png and .webp formats are supported."),
  name: z.string().min(1, { message: "Please enter name" }),
  about: z.string().min(1, { message: "Please enter info about yourself" }),
  url: z.string().url({ message: "Please enter a valid URL" }),
});

type FormData = z.infer<typeof schema>;

export const Account = () => {
  const { user, getUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [uploadImageFile, setUploadImageFile] = useState<File>();
  const [prevProfileImage, setPrevProfileImage] = useState("");
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      img: user?.profile?.avatarImage ?? "",
      name: user?.profile?.name ?? "",
      about: user?.profile?.about ?? "",
      url: user?.profile?.socialMediaURL ?? "",
    },
  });
  useEffect(() => {
    if (!user?.profile.avatarImage) return;
    setPrevProfileImage(user?.profile.avatarImage);
  }, []);
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    if (!user) return;
    const imageUrl = await uploadImage(uploadImageFile);
    setPrevProfileImage(imageUrl);
    await updateProfile(
      user.profile.id,
      data.name,
      data.about,
      imageUrl,
      data.url,
      setLoading
    );
    getUser();
  };
  return (
    <div className="flex w-full flex-col gap-6 ">
      <p className="font-bold">Personal Info</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" w-full flex flex-col gap-4 "
        >
          <FormField
            control={form.control}
            name="img"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-4 ">
                <FormLabel>Add photo</FormLabel>
                <FormControl>
                  <div className="relative w-32 h-32 rounded-full border border-dashed border-gray-300 overflow-hidden p-0">
                    {prevProfileImage ? (
                      <img
                        src={prevProfileImage}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      ""
                    )}
                    <label
                      htmlFor="add-photo"
                      className="absolute inset-0 flex items-center justify-center  text-black rounded cursor-pointer text-sm p-0"
                    >
                      <Camera size={25} />

                      <input
                        id="add-photo"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          setUploadImageFile(file);
                          field.onChange(event.target.files);
                          if (file) {
                            setPrevProfileImage(URL.createObjectURL(file));
                          }
                        }}
                      />
                    </label>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter name here" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About</FormLabel>
                <FormControl>
                  <textarea
                    className="h-[131px] w-full resize-none p-2 border rounded"
                    placeholder="Write about yourself here"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Social media URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-ful flex flex-col ">
            <Button
              type="submit"
              className={`flex  justify-center items-center text-white border-solid border pr-8 pl-8 rounded-sm p-2 
                 `}
            >
              {loading ? <Loader className="animate-spin" /> : "Save changes"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
