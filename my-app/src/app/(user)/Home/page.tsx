"use client"
import { useState } from "react";
import { Menu } from "./_components/Menu";
export default function Home() {
  const [selectedMenu,setSelectedmenu]=useState("home")
  return <div className="flex flex-row px-16 pt-16 gap-4">
   <Menu selectedMenu={selectedMenu} setSelectedmenu={setSelectedmenu}  />
   <div className="w-full h-200 border border-solid border-gray-300 ">
    {
      selectedMenu=="home" &&<div></div>
    }
     {
      selectedMenu=="explore" &&<div></div>
    }
     {
      selectedMenu=="view page" &&<div></div>
    }
     {
      selectedMenu=="account settings" &&<div></div>
    }
   </div>
  </div>;
}
