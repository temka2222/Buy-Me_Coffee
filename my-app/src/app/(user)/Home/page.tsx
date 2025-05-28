"use client";
import { useState } from "react";
import { Menu } from "./_components/Menu";
import { User } from "./_components/User";
import { ProfileDashboard } from "./_components/ProfileDashboard";
import { useUser } from "./_components/userValues";
import { ViewPage } from "../ViewPage/[id]/_components/viewPage";
export default function Home() {
  const [selectedMenu, setSelectedmenu] = useState("home");
  const { user } = useUser();
  const [range, setRange] = useState("0");
  return (
    <div className="flex  flex-row  pl-[15%] pr-16 pt-16 gap-4">
      <Menu selectedMenu={selectedMenu} setSelectedmenu={setSelectedmenu} />

      <div className="w-full h-200  ">
        {selectedMenu == "home" && (
          <div className="flex flex-col gap-8">
            <User setRange={setRange} />
            <ProfileDashboard range={range} />
          </div>
        )}
        {selectedMenu == "explore" && <div></div>}
        {selectedMenu == "view page" && (
          <div>
            <ViewPage />
          </div>
        )}
        {selectedMenu == "account settings" && <div></div>}
      </div>
    </div>
  );
}
