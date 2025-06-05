import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { isAfter, subDays } from "date-fns";
import { ChevronDown, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { Donation, useUser } from "./userValues";
import { getDonations } from "../../ViewPage/[id]/_components/getDonationsFunction";
import { Card, CardContent } from "@/components/ui/card";
import { Transaction } from "./transaction";
import { Skeleton } from "@/components/ui/skeleton";
type ProfileDashboardProps = {
  range: string;
};
export const ProfileDashboard = ({ range }: ProfileDashboardProps) => {
  const { user } = useUser();
  const [amount, setAmount] = useState("");
  const [donation, setDonation] = useState<Donation[]>();
  const [loading, setLoading] = useState(false);
  const [filteredDonation, setFilteredDonation] = useState<Donation[]>();

  const today = new Date();
  useEffect(() => {
    const loadDonation = async () => {
      setLoading(true);
      try {
        if (!user?.id) return;
        const data = await getDonations(user.id);
        setDonation(data);
        setFilteredDonation(data);
      } catch (error) {
        console.error("error to load donations", error);
      } finally {
        setLoading(false);
      }
    };

    loadDonation();
  }, [user]);
  useEffect(() => {
    if (!donation || loading) return;

    const filtered = donation
      .filter((item) => {
        if (range === "0") return true;
        return isAfter(item.createdAt, subDays(today, Number(range)));
      })
      .filter((element) => {
        if (amount === "") return true;
        return element.amount === Number(amount);
      });

    setFilteredDonation(filtered);
  }, [range, amount, donation, loading]);

  return (
    <div className="flex flex-col gap-3  ">
      <div className=" w-full flex flex-row justify-between py-8">
        <p className="font-bold text-xl ">Recent transactions</p>
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
              <SelectItem value="1">$1</SelectItem>
              <SelectItem value="2">$2</SelectItem>
              <SelectItem value="5">$5</SelectItem>
              <SelectItem value="10">$10</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="w-full flex flex-col gap-12">
          {loading ? (
            [...Array(3)].map((_, index) => (
              <div key={index} className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex flex-col gap-2 w-full">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </div>
            ))
          ) : !filteredDonation || filteredDonation.length === 0 ? (
            <Card>
              <CardContent className="p-16 flex flex-col justify-center items-center gap-4">
                <Heart fill="black" />
                <p className="font-bold text-2xl">
                  Be the first one to support{" "}
                  {user?.profile?.name || "this user"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              {filteredDonation.map((item) => (
                <Transaction
                  key={item.id}
                  name={item.donor.name}
                  amount={item.amount}
                  specialMessage={item.specialMessage}
                  profileImg={item.donor.avatarImage}
                  createdAt={item.createdAt}
                  socialMediaURL={item.socialURLOrBuyMeACoffee}
                />
              ))}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
