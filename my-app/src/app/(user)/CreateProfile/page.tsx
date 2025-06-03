"use client";

import { useState } from "react";
import { ProfileInfo } from "./_components/ProfileInfo";
import { AddPaymentCardInfo } from "./_components/AddCard";

export default function Home() {
  const [step, setStep] = useState(1);
  console.log(step);
  return (
    <div className="w-full h-screen flex justify-center items-center">
      {step == 1 && <ProfileInfo setStep={setStep} />}
      {step == 2 && <AddPaymentCardInfo />}
    </div>
  );
}
