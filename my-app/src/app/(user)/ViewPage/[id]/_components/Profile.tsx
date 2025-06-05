import { Donation, Profile } from "@/app/(user)/Home/_components/userValues";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, Heart, UserIcon } from "lucide-react";
import { Params } from "next/dist/server/request/params";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProfile } from "./getProfileFunction";
import { Support } from "./Supporter";
import { Skeleton } from "@/components/ui/skeleton";
type ProfileScreenPropsType = {
  donation: Donation[] | null;
  loading: boolean;
};

export const ProfileScreen = ({
  donation,
  loading,
}: ProfileScreenPropsType) => {
  const { id } = useParams<Params>();
  const [profile, setProfile] = useState<Profile | null>(null);

  const [seeMoreButton, setSeeMoreButton] = useState(false);
  useEffect(() => {
    const loadProfile = async () => {
      if (!id) return;
      const data = await getProfile(parseInt(id as string));
      setProfile(data?.profile);
    };

    loadProfile();
  }, [id]);
  return (
    <div className="flex-1 flex flex-col gap-4">
      <Card>
        <CardContent className="w-full flex flex-col gap-3">
          <div className="w-full flex flex-row justify-between items-center border-b border-solid py-8">
            <div className="flex flex-row gap-2 justify-center items-center">
              {profile?.avatarImage ? (
                <Image
                  width={28}
                  height={28}
                  alt=" image"
                  src={profile.avatarImage}
                  className="rounded-full"
                />
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
          {profile?.name && <p className="font-bold">About {profile.name}</p>}
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

          {loading ? (
            <>
              {[...Array(3)].map((_, index) => (
                <div key={index} className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[150px]" />
                  </div>
                </div>
              ))}
            </>
          ) : !donation || donation.length === 0 ? (
            <Card>
              <CardContent className="p-16 flex flex-col justify-center items-center gap-4">
                <Heart fill="black" />
                <p className="font-bold text-2xl">
                  Be the first one to support {profile?.name || "this user"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              {(seeMoreButton ? donation : donation.slice(0, 3)).map((item) => (
                <Support
                  key={item.id}
                  name={item.donor.name}
                  amount={item.amount}
                  specialMessage={item.specialMessage}
                  profileImg={item.donor.avatarImage}
                />
              ))}
              {donation.length > 3 && (
                <Button
                  variant="outline"
                  onClick={() => setSeeMoreButton(!seeMoreButton)}
                >
                  {seeMoreButton ? "See less" : "See more"}
                  <ChevronDown />
                </Button>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
