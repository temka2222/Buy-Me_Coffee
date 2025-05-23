import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CameraIcon, Loader } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useUser } from "./userValues";
import { api } from "@/app/axios";
import { toast } from "sonner";
import { uploadImage } from "../../CreateProfile/_components/uploadImageFunction";

export const Cover = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [coverImage, setCoverImage] = useState(
    user ? user?.profile.backgroundImage : ""
  );
  const [uploadImageFile, setUploadImageFile] = useState<File>();
  const addCoverImage = async (backgroundImage: string) => {
    try {
      setLoading(true);
      const backgroundImageURL = await uploadImage(uploadImageFile);
      console.log(backgroundImage);
      const { data } = await api.put(`/profile/${user?.profile.id}`, {
        backgroundImage: backgroundImageURL,
      });
      setCoverImage(backgroundImageURL);
      setUploadImageFile(undefined);
      toast.success("success!");
    } catch (error) {
      {
        toast.error("error!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-[40%] bg-[#d2d2d8] justify-center items-center ">
      {uploadImageFile ? (
        <div className=" absolute z-20 w-full flex justify-end  p-4">
          <div className="flex flex-row gap-4 ">
            <Button
              className="w-30"
              onClick={() => {
                if (coverImage) addCoverImage(coverImage);
              }}
            >
              {loading ? <Loader className="animate-spin " /> : "Save changes"}
            </Button>
            <Button
              onClick={() => {
                setCoverImage(coverImage);
                setUploadImageFile(undefined);
              }}
              className="w-30"
              variant="outline"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        ""
      )}

      {coverImage ? (
        <Image
          src={coverImage}
          alt="Cover image"
          fill
          className=" object-cover"
        />
      ) : (
        ""
      )}
      {loading && (
        <div className="absolute w-full h-full inset-0 flex items-center justify-center z-50 bg-black/30">
          <Loader className="animate-spin text-white w-10 h-10" />
        </div>
      )}
      <div className="absolute  w-50 h-10 flex flex-col bottom-1/2 left-1/2 transform -translate-x-1/2 items-center justify-center bg-black text-white rounded-xl  ">
        <label htmlFor="cover" className="flex flex-row gap-2 z-10">
          <CameraIcon /> {coverImage ? "Edit" : "Add"} cover image
          <input
            id="cover"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              setUploadImageFile(file);
              if (file) {
                setCoverImage(URL.createObjectURL(file));
              }
            }}
          />
        </label>
      </div>
    </div>
  );
};
