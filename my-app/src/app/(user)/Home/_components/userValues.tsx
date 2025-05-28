"use client";
import { api, setAuthToken } from "@/app/axios";
import axios from "axios";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";
export type Profile = {
  id: number;
  name: string;
  about: string;
  avatarImage: string;
  socialMediaURL: string;
  backgroundImage: string;
  successMessage: string;
  userId: number;
};
type Bankcard = {
  id: number;
  country: string;
  firstname: string;
  lastName: string;
  cardNumber: string;
  expiryDate: string;
  userId: number;
};
export type Donation = {
  id: number;
  amount: number;
  specialMessage: string;
  socialURLOrBuyMeACoffee: string;
  donorId: number;
  donor: Profile;
  recipientId: number;
  createdAt: Date;
};
export type UserType = {
  id: number;
  email: string;
  password: string;
  username: string;
  profile: Profile;
  bankCard: Bankcard;
  createdAt: string;
  updatedAt: string;
  receivedDonations: Donation[];
};
export type UserContextType = {
  user?: UserType;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
  step: number;
  setStep: (value: number) => void;
  setLoading: (value: boolean) => void;
  createProfile: (
    name: string,
    about: string,
    avatarImage: string,
    socialMediaURL: string,
    userId: number
  ) => Promise<void>;
  loading: boolean;
} & PropsWithChildren;

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<UserType>();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data } = await api.post("/auth/signin", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      setUser(data.user);
      await getUser();
      router.push("/Home");
    } catch {
      toast.error("Нэвтрэх үйлдэл амжилтгүй");
    } finally {
      setLoading(false);
    }
  };
  const createProfile = async (
    name: string,
    about: string,
    avatarImage: string,
    socialMediaURL: string,
    userId: number
  ) => {
    try {
      await api.post(`/profile/${userId}`, {
        name,
        about,
        avatarImage,
        socialMediaURL,
        backgroundImage: "",
        successMessage: "",
      });

      toast.success("success!");
    } catch (error) {
      toast.error("error!");
    }
  };

  const signUp = async (email: string, password: string, username: string) => {
    try {
      setLoading(true);
      const { data } = await api.post("/auth/signup", {
        email,
        password,
        username,
      });
      localStorage.setItem("token", data.token);
      setUser(data.user);

      router.push("./CreateProfile");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const message = error.response.data.message;

        if (message === "Имэйл бүртгэлтэй байна") {
          toast.error("Имэйл бүртгэлтэй байна");
          setStep(step - 1);
        } else {
          toast.error(message || "Бүртгэл амжилтгүй боллоо");
        }
      } else {
        toast.error("Сервертэй холбогдож чадсангүй");
      }
    } finally {
      setLoading(false);
    }
  };
  const signOut = async () => {
    localStorage.removeItem("token");
    setUser(undefined);
    router.push("./Home");
  };

  const getUser = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/auth/me");
      setUser(data);
    } catch (error) {
      console.log(error);

      // localStorage.removeItem("token");
      // setUser(undefined);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    setAuthToken(token);
    getUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        signIn,
        signOut,
        signUp,
        loading,
        step,
        setStep,
        setLoading,
        createProfile,
      }}
    >
      {loading ? (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
          <Loader className="animate-spin w-20 h-20 text-gray-500" />
        </div>
      ) : (
        children
      )}
    </UserContext.Provider>
  );
};
export const useUser = () => useContext(UserContext);
