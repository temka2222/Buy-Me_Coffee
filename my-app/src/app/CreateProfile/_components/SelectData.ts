import axios from "axios";
import { useState } from "react";
type CountryType = {
  country: string;
};
export const selectCountry = async () => {
  const [countries, setCountries] = useState<CountryType[]>([]);
  try {
    const { data } = await axios.get(
      "https://countriesnow.space/api/v0.1/countries"
    );
    setCountries(data.data);
  } catch (error) {
    console.log(error);
  }
  return countries;
};
