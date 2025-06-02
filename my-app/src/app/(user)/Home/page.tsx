"use client";
import { useState } from "react";
import { Menu } from "./_components/Menu";
import { User } from "./_components/User";
import { ProfileDashboard } from "./_components/ProfileDashboard";
import { useUser } from "./_components/userValues";
import { Card } from "@/components/ui/card";

import { SetPassword } from "./_components/SetPassword";
import { PaymentDetail } from "./_components/PaymentDetail";
import { AccountSettings } from "./_components/AccountSettings";
import { SuccessMessage } from "./_components/SuccessMessage";
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
        {/* {selectedMenu == "view page" && (
          <div>
            <ViewPage />
          </div>
        )} */}
        {selectedMenu == "account settings" && (
          <div className="flex w-[80%] flex-col gap-4">
            <p className="font-medium text-2xl">My account</p>
            <p></p>
            <AccountSettings />
            <SetPassword />
            <PaymentDetail />
            <SuccessMessage />
          </div>
        )}
      </div>
    </div>
  );
}
