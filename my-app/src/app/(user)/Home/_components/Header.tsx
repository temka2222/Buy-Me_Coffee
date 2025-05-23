"use client";
import { ChevronDown, CoffeeIcon, User2Icon, UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useUser } from "./userValues";
import Image from "next/image";

export const Header = () => {
  const { user } = useUser();
  return (
    <div className="w-full fixed flex flex-row justify-between px-16 pt-4 ">
      <div className="flex flex-row items-center justify-center gap-2">
        <CoffeeIcon size={18} />
        <p className="font-medium">Buy Me Coffee</p>
      </div>
      <div className="flex flex-row gap-3">
        <div className="flex flex-row gap-2 justify-center items-center">
          {user ? (
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
          <p className="font-bold">{user?.profile.name}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <ChevronDown size={18} />
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" className="px-6 pt-4">
            <Button className="bg-white text-black hover:bg-gray-400 ">
              log out
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
