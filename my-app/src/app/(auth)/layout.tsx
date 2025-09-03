import Image from "next/image";
import { PropsWithChildren } from "react";

export default function CustomerLayout({ children }: PropsWithChildren) {
  return (
    <div className="antialiased w-full flex flex-row ">
      <div className="flex flex-1 w-full h-screen bg-amber-400 justify-center items-center ">
       <Image
        src="/images.jpeg"     
        alt=" Logo"  
        width={200}         
        height={80}         
        priority            
      />
      </div>
      <div className="flex-1 h-screen ">{children}</div>
    </div>
  );
}
