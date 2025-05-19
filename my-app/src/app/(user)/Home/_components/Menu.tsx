"use client";
import { ExternalLink } from "lucide-react";

type SelectedMenuPropType = {
  selectedMenu: string;
  setSelectedmenu: (value: string) => void;
};
export const Menu = ({
  setSelectedmenu,
  selectedMenu,
}: SelectedMenuPropType) => {
  return (
    <div className=" w-[15%] flex flex-col gap-1 font-small ">
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
