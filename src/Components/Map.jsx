import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
function Map() {
  const [position, setPosition] = useSearchParams();
  const lat = position.get("lat");
  const lng = position.get("lng");
  const navigate = useNavigate();

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      map {lat} , {lng}
    </div>
  );
}

export default Map;
