import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Copy, User2Icon } from "lucide-react";
import { UserType, useUser } from "./userValues";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
type UserProps = {
  setRange: (value: string) => void;
};
export const User = ({ setRange }: UserProps) => {
  const { user, loading } = useUser();
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [profile, setProfile] = useState<UserType>();
  useEffect(() => {
    if (!user) {
      return;
    } else if (!loading && user) {
      setProfile(user);
    }
  }, [loading, user, router]);
  const shareUrl = `http://localhost:3000/ViewPage/${profile?.id}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Холбоос амжилттай хууллаа!");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error(error);
      toast.error("Хуулахад алдаа гарлаа");
    }
  };

  return (
    <Card>
      <CardContent className="w-full flex flex-col gap-6 p-6">
        <div className="flex flex-row justify-between border-b border-solid pb-8">
          <div className="flex flex-row gap-4 items-center">
            {profile?.profile?.avatarImage ? (
              <Image
                width={36}
                height={36}
                alt="User Avatar"
                className="rounded-full"
                src={profile.profile.avatarImage}
              />
            ) : (
              <User2Icon />
            )}
            <div className="flex flex-col">
              <p className="font-bold">{profile?.profile?.name}</p>
              <p className="text-sm text-muted-foreground">
                buymeacoffee.com/{profile?.username}
              </p>
            </div>
          </div>
          <Button
            className="flex flex-row gap-2 items-center"
            onClick={handleCopy}
          >
            <Copy size={14} />
            {copied ? "Copied!" : "Share page link"}
          </Button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-4 items-center">
            <p className="font-medium text-xl">Earnings</p>
            <Select
              onValueChange={(value) => {
                setRange(value);
              }}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                  <SelectItem value="0">All time</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <p className="font-bold text-3xl">$450</p>
        </div>
      </CardContent>
    </Card>
  );
};
