import { formatDistanceToNow } from "date-fns";
import { validateHeaderName } from "http";
import { UserIcon } from "lucide-react";
import Image from "next/image";

type SupportProps = {
  name: string;
  amount: number;
  specialMessage: string;
  profileImg: string;
};
export const Support = ({
  name,
  amount,
  specialMessage,
  profileImg,
}: SupportProps) => {
  const validSrc = profileImg && profileImg.trim() !== "" ? profileImg : null;
  return (
    <div className=" flex flex-row gap-2">
      <div className="flex-1">
        {validSrc && (
          <Image
            src={validSrc}
            alt="User avatar"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />
        )}
      </div>
      <div className="flex-9 flex-col gap-3 ">
        <p className="font-bold">
          {name} bought ${amount} coffee
        </p>
        <p>{specialMessage}</p>
      </div>
    </div>
  );
};
