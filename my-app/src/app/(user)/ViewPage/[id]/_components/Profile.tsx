import {
  Donation,
  Profile,
  useUser,
} from "@/app/(user)/Home/_components/userValues";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, User2, UserIcon } from "lucide-react";
import { Params } from "next/dist/server/request/params";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProfile } from "./getProfileFunction";
import { getDonations } from "./getDonationsFunction";

export const ProfileScreen = () => {
  const { id } = useParams<Params>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [donation, setDonation] = useState<Donation[]>();
  useEffect(() => {
    const loadProfile = async () => {
      if (!id) return;
      const data = await getProfile(parseInt(id as string));
      setProfile(data?.profile);
    };
    const loadDonation = async () => {
      if (!id) return;
      const data = await getDonations(parseInt(id as string));
      setDonation(data);
      console.log("data", data);
    };

    loadProfile();
    loadDonation();
  }, [id]);
  return (
    <div className=" flex-1  flex flex-col gap-4">
      <Card>
        <CardContent className="w-full flex flex-col gap-3">
          <div className="w-full flex flex-row justify-between items-center border-b border-solid py-8 ">
            <div className="flex flex-row gap-2 justify-center items-center">
              {profile?.avatarImage ? (
                <Image
                  width={28}
                  height={28}
                  alt=" image"
                  src={profile.avatarImage}
                  className="rounded-full"
                ></Image>
              ) : (
                <UserIcon />
              )}
              {profile?.avatarImage ? (
                <p className="font-bold">{profile.name}</p>
              ) : (
                ""
              )}
            </div>
            <Button variant="outline">Edit page</Button>
          </div>
          {profile?.name ? (
            <p className="font-bold">about {profile.name}</p>
          ) : (
            ""
          )}
          <p>
            I’m a typical person who enjoys exploring different things. I also
            make music art as a hobby. Follow me along.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="w-full flex flex-col gap-3">
          <p className="font-bold">Social media URL</p>
          <p>{`http://localhost:3000/ViewPage/${profile?.userId}`}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="w-full flex flex-col gap-3">
          <p className="font-bold">Recent Supporters</p>
          {!donation || donation.length === 0 ? (
            <Card>
              <CardContent className="p-16 flex flex-col justify-center items-center gap-4">
                <Heart fill="black" />
                <p className="font-bold text-2xl">
                  Be the first one to support {profile?.name || "this user"}
                </p>
              </CardContent>
            </Card>
          ) : (
            donation.map((item) => <p key={item.id}>Donation ID: {item.id}</p>)
          )}
        </CardContent>
      </Card>
    </div>
  );
};
