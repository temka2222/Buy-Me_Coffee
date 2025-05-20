"use client";

import { Cover } from "./_components/CoverImage";
import { CreateDonation } from "./_components/CreateDonation";
import { Profile } from "./_components/Profile";

export default function Home() {
  return (
    <div className=" relative w-full h-screen flex flex-col">
      <Cover />
      <div className=" absolute w-full flex flex-row gap-16 px-16 top-[30%] ">
        <Profile />
        <CreateDonation />
      </div>
    </div>
  );
}
