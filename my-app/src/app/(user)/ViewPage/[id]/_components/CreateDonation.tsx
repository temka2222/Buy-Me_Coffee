import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CoffeeIcon, Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Profile, useUser } from "@/app/(user)/Home/_components/userValues";
import { useParams } from "next/navigation";
import { Params } from "next/dist/server/request/params";
import { getProfile } from "./getProfileFunction";
import { CreateDonationFun } from "./createDonationFunction";
type CreateDonationPropsType = {
  loadDonation: () => Promise<void>;
};
export const CreateDonation = ({ loadDonation }: CreateDonationPropsType) => {
  const [amount, setAmount] = useState(0);
  const [socialURL, setSocialURL] = useState("");
  const [specialMessage, setSpecialMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const { id } = useParams<Params>();
  const [profile, setProfile] = useState<Profile | null>(null);
  useEffect(() => {
    const loadProfile = async () => {
      if (!id) return;
      const data = await getProfile(parseInt(id as string));
      setProfile(data?.profile);
    };

    loadProfile();
  }, [id]);
  return (
    <Card className="flex-1 ">
      <CardContent className="flex flex-col gap-6 ">
        <p className=" font-bold text-2xl">Buy {profile?.name} a Coffee</p>
        <div className="flex flex-col gap-2">
          <p className="font-medium text-xl">Select amount:</p>
          <div className="flex flex-row gap-12 ">
            <Badge
              onClick={() => setAmount(1)}
              variant="secondary"
              className={`flex flex-row gap-2 p-3 ${
                amount == 1 ? "border-black" : ""
              }`}
            >
              <CoffeeIcon />
              $1
            </Badge>
            <Badge
              onClick={() => setAmount(2)}
              variant="secondary"
              className={`flex flex-row gap-2 p-3 ${
                amount == 2 ? "border-black" : ""
              }`}
            >
              <CoffeeIcon />
              $2
            </Badge>
            <Badge
              onClick={() => setAmount(5)}
              variant="secondary"
              className={`flex flex-row gap-2 p-3 ${
                amount == 5 ? "border-black" : ""
              }`}
            >
              <CoffeeIcon />
              $5
            </Badge>
            <Badge
              onClick={() => setAmount(10)}
              variant="secondary"
              className={`flex flex-row gap-2 p-3 ${
                amount == 10 ? "border-black" : ""
              }`}
            >
              <CoffeeIcon />
              $10
            </Badge>
          </div>
        </div>

        <div className="w-full flex flex-col gap-2">
          <p className="font-medium">Enter BuyMeCoffee or social acount URL:</p>
          <Input
            onChange={(e) => {
              setSocialURL(e.target.value);
            }}
            placeholder="buymeacoffee.com/"
          ></Input>
        </div>
        <div className="w-full h-full  flex flex-col gap-2">
          <p className="font-medium">Special message:</p>
          <Textarea
            value={specialMessage}
            onChange={(e) => setSpecialMessage(e.target.value)}
            placeholder="Please write your message here"
            className="w-full  h-[150px] "
          ></Textarea>
        </div>
        <Button
          onClick={async () => {
            await CreateDonationFun(
              Number(id),
              amount,
              specialMessage,
              user ? user.id : 1,
              socialURL,
              setLoading
            );
            await loadDonation();
          }}
          disabled={!amount || !socialURL}
          className="text-white"
        >
          {loading ? <Loader className="animate-spin" /> : "Support"}
        </Button>
      </CardContent>
    </Card>
  );
};
