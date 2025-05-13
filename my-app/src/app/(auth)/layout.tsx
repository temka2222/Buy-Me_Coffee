import { PropsWithChildren } from "react";

export default function CustomerLayout({ children }: PropsWithChildren) {
  return (
    <div className="antialiased w-full flex flex-row ">
      <div className="flex-1 w-full h-screen bg-amber-400 ">tretertewt</div>
      <div className="flex-1 h-screen ">{children}</div>
    </div>
  );
}
