"use client";

import { useEffect, useState } from "react";
import { Donation } from "../../Home/_components/userValues";
import { useParams } from "next/navigation";
import { Params } from "next/dist/server/request/params";
import { getDonations } from "./_components/getDonationsFunction";
import { Cover } from "./_components/CoverImage";
import { CreateDonation } from "./_components/CreateDonation";
import { ProfileScreen } from "./_components/Profile";
export default function Home() {
  const { id } = useParams<Params>();
  const [donation, setDonation] = useState<Donation[] | null>(null);
  const loadDonation = async () => {
    if (!id) return;
    try {
      const data = await getDonations(parseInt(id as string));
      setDonation(data);
    } catch {}
  };
  useEffect(() => {
    loadDonation();
  }, [id]);
  return (
    <div className=" relative w-full h-screen flex flex-col pt-20">
      <Cover />
      <div className=" absolute w-full flex flex-row gap-16 px-16 top-[40%] ">
        <ProfileScreen donation={donation} />
        <CreateDonation loadDonation={loadDonation} />
      </div>
    </div>
  );
}
