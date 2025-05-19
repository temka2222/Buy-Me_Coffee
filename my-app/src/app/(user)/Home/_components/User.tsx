import { Button } from "@/components/ui/button"
import { Copy, User2 } from "lucide-react"

export const User=()=>{
    return(
        <div className=" flex flex-col ">
        <div className="flex flex-col gap-2">
            <User2/>
            <div className=" flex flex-col gap-2">
                <p className="font-medium">name</p>
                <p>buymeacoffee.com/baconpancakes1</p>
            </div>
        </div>
        <Button className="flex flex-row justify-center items-center gap-2"><Copy size={12}/> Share page link</Button>
        </div>
    )
}