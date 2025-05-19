import { ChevronDown, CoffeeIcon, User2Icon } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export const Header=()=>{
    return(
        <div className="w-full flex flex-row justify-between px-16 py-4 ">
          <div className="flex flex-row items-center justify-center gap-2">
            <CoffeeIcon size={18}/>
            <p className="font-medium">Buy Me Coffee</p>
            </div>  
            <div className="flex flex-row gap-3">
                <div className="flex flex-row gap-2">
                 <User2Icon size={18}/>
                 <p className="font-medium">username</p>
                </div>
                <DropdownMenu >
  <DropdownMenuTrigger><ChevronDown size={18}/></DropdownMenuTrigger>
  <DropdownMenuContent 
   side="bottom"      
    className="px-6 pt-4">
    <Button className="bg-white text-black hover:bg-gray-400 ">log out</Button>
 </DropdownMenuContent> 
</DropdownMenu>
 </div>
 </div>
    )
}