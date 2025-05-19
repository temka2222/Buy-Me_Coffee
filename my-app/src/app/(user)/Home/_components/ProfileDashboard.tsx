import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
export const ProfileDashboard = () => {
  const [amount, setAmount] = useState("");
  return (
    <div className="flex flex-col gap-3  ">
      <div className=" w-full flex flex-row justify-between py-8">
        <p className="font-medium">Recent transactions</p>
        <Select value={amount} onValueChange={setAmount}>
          <SelectTrigger className="w-[140px] border border-dashed flex items-center justify-between relative [&>svg]:hidden">
            <div>
              <ChevronDown />
            </div>
            <span className="text-black font-medium">
              Amount{amount ? ` | ${amount}` : ""}
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="$1">$1</SelectItem>
              <SelectItem value="$2">$2</SelectItem>
              <SelectItem value="$5">$5</SelectItem>
              <SelectItem value="$10">$10</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-4 border border-solid  rounded-xl h-150 "></div>
    </div>
  );
};
