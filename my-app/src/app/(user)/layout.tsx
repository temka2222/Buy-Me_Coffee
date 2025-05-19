import { PropsWithChildren } from "react";
import { Header } from "./Home/_components/Header";

export default function CustomerLayout({ children }: PropsWithChildren) {
  return (
    <div className="antialiased w-full flex flex-col  ">
      <Header/>
      <div className="flex-1 h-screen ">{children}</div>
    </div>
  );
}