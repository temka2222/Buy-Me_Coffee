import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, User2, UserIcon } from "lucide-react";
import { useUser } from "../../Home/_components/userValues";
import Image from "next/image";

export const Profile = () => {
  const { user } = useUser();
  return (
    <div className=" flex-1  flex flex-col gap-4">
      <Card>
        <CardContent className="w-full flex flex-col gap-3">
          <div className="w-full flex flex-row justify-between items-center border-b border-solid py-8 ">
            <div className="flex flex-row gap-2 justify-center items-center">
              {user?.profile?.avatarImage ? (
                <Image
                  width={28}
                  height={28}
                  alt=" image"
                  src={user.profile.avatarImage}
                  className="rounded-full"
                ></Image>
              ) : (
                <UserIcon />
              )}
              {user?.profile?.avatarImage ? (
                <p className="font-bold">{user?.profile.name}</p>
              ) : (
                ""
              )}
            </div>
            <Button variant="outline">Edit page</Button>
          </div>
          {user?.profile?.name ? (
            <p className="font-bold">about {user?.profile.name}</p>
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
          <p>https://buymeacoffee.com/spacerulz44</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="w-full flex flex-col gap-3">
          <p className="font-bold">Recent Supporters</p>
          <Card>
            <CardContent className="p-16 flex flex-col justify-center items-center gap-4">
              <Heart fill="black" />
              <p className="font-bold text-2xl">
                Be the first one to support Jake
              </p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};
