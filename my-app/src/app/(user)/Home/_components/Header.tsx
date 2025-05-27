"use client";
import { ChevronDown, CoffeeIcon, UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useUser } from "./userValues";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

export const Header = () => {
  const { user, signOut } = useUser();
  const router = useRouter();

  return (
    <div className="w-full fixed flex flex-row justify-between px-16 pt-4 z-50 bg-white">
      <div className="flex flex-row items-center justify-center gap-2">
        <CoffeeIcon size={18} />
        <p className="font-bold">Buy Me Coffee</p>
      </div>

      <div className="flex flex-row gap-3 items-center">
        {user?.profile ? (
          <>
            <div className="flex flex-row gap-2 items-center">
              <Image
                width={28}
                height={28}
                alt="image"
                src={user.profile?.avatarImage}
                className="rounded-full"
              />

              <p className="font-bold">{user?.profile?.name ?? "Anonymous"}</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <ChevronDown size={18} />
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom" className="px-6 pt-4">
                <Button
                  onClick={signOut}
                  className="bg-white text-black hover:bg-gray-400"
                >
                  Log out
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <Badge
            onClick={() => {
              router.push("/Login");
            }}
            className="px-5 py-2"
            variant="secondary"
          >
            Login
          </Badge>
        )}
      </div>
    </div>
  );
};
