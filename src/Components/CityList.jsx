import CityItem from "./CityItem";
import Sppiner from "./Spinner";
import Message from "./Message";

import styles from "./CityList.module.css";
import { useCities } from "../context/citiesContext";

function CityList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Sppiner />;

  if (!cities.length)
    return <Message message={"please add your city by clicking on map"} />;
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
