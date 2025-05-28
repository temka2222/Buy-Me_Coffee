import { formatDistanceToNow } from "date-fns";
import { validateHeaderName } from "http";
import Image from "next/image";

type TransactionProps = {
  name: string;
  amount: number;
  specialMessage: string;
  profileImg: string;
  createdAt: Date;
  socialMediaURL: string;
};
export const Transaction = ({
  name,
  amount,
  specialMessage,
  profileImg,
  createdAt,
  socialMediaURL,
}: TransactionProps) => {
  const validSrc = profileImg && profileImg.trim() !== "" ? profileImg : null;

  return (
    <div className=" w-full  flex flex-col gap-1">
      <div className=" w-full flex flex-row justify-between ">
        <div className="flex flex-row gap-4  items-center">
          {validSrc && (
            <Image
              src={validSrc}
              alt="User avatar"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />
          )}
          <div className="flex flex-col ">
            {name && <p className="font-bold ">{name}</p>}
            {socialMediaURL && <p className="font-sans">{socialMediaURL}</p>}
          </div>
        </div>
        <div className="flex flex-col gap-4 items-end">
          {amount && <p className="font-bold">${amount}</p>}
          {createdAt && (
            <p className="text-gray-500 text-sm">
              {formatDistanceToNow(createdAt, { addSuffix: true })}
            </p>
          )}
        </div>
      </div>
      {specialMessage && <p>{specialMessage}</p>}
    </div>
  );
};
