import { z } from "zod";
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const schema = z.object({
  img: z
    .any({ message: "Please enter image" })
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file[0].type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  name: z.string().min(1, { message: "Please enter name" }),
  about: z.string().min(1, { message: "Please enter name" }),
});

type FormData = z.infer<typeof schema>;
export const ProfileInfo = () => {
  return (
    <div>
      <p className="font-medium text-2xl">Complete your profile page</p>
    </div>
  );
};
