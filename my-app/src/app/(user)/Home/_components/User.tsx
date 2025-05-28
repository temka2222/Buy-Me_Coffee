import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Copy, User2, User2Icon } from "lucide-react";
import { useUser } from "./userValues";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
type UserProps = {
  setRange: (value: string) => void;
};
export const User = ({ setRange }: UserProps) => {
  const { user } = useUser();
  const [copied, setCopied] = useState(false);
  const shareUrl = `http://localhost:3000/ViewPage/${user?.id}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Холбоос амжилттай хууллаа!");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Хуулахад алдаа гарлаа");
    }
  };

  return (
    <Card>
      <CardContent className="w-full flex flex-col gap-6 p-6">
        <div className="flex flex-row justify-between border-b border-solid pb-8">
          <div className="flex flex-row gap-4 items-center">
            {user?.profile?.avatarImage ? (
              <Image
                width={36}
                height={36}
                alt="User Avatar"
                className="rounded-full"
                src={user.profile.avatarImage}
              />
            ) : (
              <User2Icon />
            )}
            <div className="flex flex-col">
              <p className="font-bold">{user?.profile?.name}</p>
              <p className="text-sm text-muted-foreground">
                buymeacoffee.com/{user?.username}
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
