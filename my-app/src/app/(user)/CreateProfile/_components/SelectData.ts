import axios from "axios";
import { useEffect, useState } from "react";

type CountryType = {
  country: string;
};

export const useSelectCountry = () => {
  const [countries, setCountries] = useState<CountryType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const SelectCountry = async () => {
      try {
        const { data } = await axios.get(
          "https://countriesnow.space/api/v0.1/countries"
        );
        setCountries(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    SelectCountry();
  }, []);

  return { countries, loading };
};
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const years = [
  2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035,
];

export const formatCardNumber = (cardNumber: string) => {
  const digitCardNumber: string[] = [];

  for (let i = 0; i < cardNumber.length; i++) {
    if (cardNumber[i] != "-") {
      digitCardNumber.push(cardNumber[i]);
    }
  }

  const formattedNumber: string[] = [];
  for (let i = 0; i < digitCardNumber.length; i += 4) {
    formattedNumber.push(digitCardNumber.slice(i, i + 4).join(""));
  }

  return formattedNumber.join("-");
};

export const cardNumberValue = (cardNumber: string) => {
  const digitCardNumber: string[] = [];

  for (let i = 0; i < cardNumber.length; i++) {
    if (cardNumber[i] != "-") {
      digitCardNumber.push(cardNumber[i]);
    }
  }

  return digitCardNumber.join("");
};
