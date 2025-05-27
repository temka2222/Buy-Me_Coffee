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
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export const User = () => {
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
    <div className="w-full flex flex-col gap-4 border border-solid p-6 rounded-xl">
      <div className="w-full  flex flex-row justify-between border-b border-solid py-16 ">
        <div className="flex flex-row gap-2 justify-center items-center ">
          {user?.profile?.avatarImage ? (
            <Image
              width={36}
              height={36}
              alt="image"
              className="rounded-full"
              src={user.profile.avatarImage}
            />
          ) : (
            <User2Icon />
          )}
          <div className="flex flex-col">
            <p className="font-bold">{user?.profile?.name}</p>
            <p>buymeacoffee.com/{user?.username}</p>
          </div>
        </div>
        <Button
          className="flex flex-row justify-center items-center gap-2"
          onClick={handleCopy}
        >
          <Copy size={12} />
          {copied ? "Copied!" : "Share page link"}
        </Button>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-row gap-4">
          <p className="font-medium text-xl">Earnings</p>
          <Select>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Last 30 days">Last 30 days </SelectItem>
                <SelectItem value="Last 90 days">Last 90 days</SelectItem>
                <SelectItem value="All time">All time</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <p className="font-bold text-3xl">$450</p>
      </div>
    </div>
  );
};
