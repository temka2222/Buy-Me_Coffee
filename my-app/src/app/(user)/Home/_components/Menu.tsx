"use client";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { useUser } from "./userValues";

type SelectedMenuPropType = {
  selectedMenu: string;
  setSelectedmenu: (value: string) => void;
};
export const Menu = ({
  setSelectedmenu,
  selectedMenu,
}: SelectedMenuPropType) => {
  const { user } = useUser();
  return (
    <div className="fixed top-16 left-16 w-[10%] flex flex-col gap-1 font-small ">
      <div
        onClick={() => {
          setSelectedmenu("home");
        }}
        className={`${
          selectedMenu == "home" ? "bg-gray-200" : ""
        } pl-4 py-2 rounded-xl`}
      >
        Home
      </div>
      <div
        onClick={() => {
          setSelectedmenu("explore");
        }}
        className={`${
          selectedMenu == "explore" ? "bg-gray-200" : ""
        } pl-4 py-2 rounded-xl`}
      >
        Explore
      </div>
      <Link href={`http://localhost:3000/ViewPage/${user?.id}`} key={user?.id}>
        <div
          onClick={() => {
            setSelectedmenu("view page");
          }}
          className={`flex flex-row gap-1 ${
            selectedMenu == "view page" ? "bg-gray-200" : ""
          } items-center pl-4 py-2 rounded-xl `}
        >
          View page <ExternalLink size={16} />
        </div>
      </Link>
      <div
        onClick={() => {
          setSelectedmenu("account settings");
        }}
        className={`${
          selectedMenu == "account settings" ? "bg-gray-200" : ""
        } pl-4 py-2 rounded-xl`}
      >
        Account settings
      </div>
    </div>
  );
};
