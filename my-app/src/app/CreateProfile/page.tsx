"use client";

import { useState } from "react";
import { ProfileInfo } from "./_components/ProfileInfo";

export default function Home() {
  const [step, setStep] = useState(1);
  return (
    <div className="w-full h-screen flex justify-center items-center">
      {step == 1 && <ProfileInfo />}
    </div>
  );
}
