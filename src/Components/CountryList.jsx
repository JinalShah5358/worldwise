import Sppiner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";

import styles from "./CountryList.module.css";
import { useCities } from "../context/citiesContext";

function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Sppiner />;

  if (!cities.length)
    return <Message message={"please add your city by clicking on map"} />;

  const Countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {Countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
