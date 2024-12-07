import CityItem from "./CityItem";
import Sppiner from "./Spinner";

import styles from "./CityList.module.css";

function CityList({ cities, isLoading }) {
  if (isLoading) return <Sppiner />;
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
