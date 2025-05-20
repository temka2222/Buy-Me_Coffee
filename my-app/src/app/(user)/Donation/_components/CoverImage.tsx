import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CameraIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export const Cover = () => {
  const [coverImage, setCoverImage] = useState("");
  return (
    <div className="relative w-full h-[40%] bg-[#d2d2d8] ">
      {coverImage ? (
        <div className=" absolute z-20 w-full flex justify-end  p-4">
          <div className="flex flex-row gap-4 ">
            <Button>Save changes</Button>
            <Button variant="outline">Cancel</Button>
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
      <div className="absolute  w-50 h-10 flex flex-col bottom-1/2 left-1/2 transform -translate-x-1/2 items-center justify-center bg-black text-white rounded-xl  ">
        <label htmlFor="cover" className="flex flex-row gap-2 z-10">
          <CameraIcon /> Add a cover image
          <input
            id="cover"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];

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
