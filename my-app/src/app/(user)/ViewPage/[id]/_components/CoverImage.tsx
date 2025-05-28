"use client";
import { Button } from "@/components/ui/button";
import { CameraIcon, Loader } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Profile, useUser } from "../../../Home/_components/userValues";
import { api } from "@/app/axios";
import { toast } from "sonner";
import { uploadImage } from "../../../CreateProfile/_components/uploadImageFunction";
import { useParams } from "next/navigation";
import { Params } from "next/dist/server/request/params";
import { getProfile } from "./getProfileFunction";

export const Cover = () => {
  const { id } = useParams<Params>();
  const { user } = useUser();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);
  const [coverImage, setCoverImage] = useState("");
  const [uploadImageFile, setUploadImageFile] = useState<File>();
  useEffect(() => {
    const loadProfile = async () => {
      if (!id) return;
      const data = await getProfile(parseInt(id as string));
      if (data?.profile?.backgroundImage) {
        setCoverImage(data.profile.backgroundImage);
      }
      setProfile(data?.profile);
    };

    loadProfile();
  }, [id]);
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
  useEffect(() => {
    if (user?.profile?.backgroundImage) {
      setCoverImage(user.profile.backgroundImage);
    }
  }, [user, coverImage]);

  return (
    <div className="relative w-full h-[50%] bg-[#d2d2d8] justify-center items-center ">
      {uploadImageFile && (
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
                setCoverImage(
                  user ? user?.profile.backgroundImage : coverImage
                );
                setUploadImageFile(undefined);
              }}
              className="w-30"
              variant="outline"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {coverImage && (
        <Image
          src={coverImage}
          alt="Cover image"
          fill
          className=" object-cover"
        />
      )}

      {loading && (
        <div className="absolute w-full h-full inset-0 flex items-center justify-center z-50 bg-black/30">
          <Loader className="animate-spin text-white w-10 h-10" />
        </div>
      )}
      {user && (
        <div
          className={`absolute w-50 h-10 ${
            uploadImageFile ? "hidden" : "flex"
          } items-center justify-center bg-black text-white rounded-xl ${
            !profile?.backgroundImage
              ? "bottom-1/2 left-1/2 transform -translate-x-1/2"
              : "top-3 right-3"
          }`}
        >
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
      )}
    </div>
  );
};
