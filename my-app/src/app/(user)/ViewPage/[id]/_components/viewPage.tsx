"use client";
import { Cover } from "./CoverImage";
import { CreateDonation } from "./CreateDonation";
import { ProfileScreen } from "./Profile";

export const ViewPage = () => {
  return (
    <div className=" relative w-full h-screen flex flex-col">
      <Cover />
      <div className=" absolute w-full flex flex-row gap-16 px-16 top-[40%] ">
        <ProfileScreen />
        <CreateDonation />
      </div>
    </div>
  );
};
