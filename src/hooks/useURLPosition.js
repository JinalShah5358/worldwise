import { useSearchParams } from "react-router-dom";

export function useURLPosition() {
  const [position] = useSearchParams();
  const lat = position.get("lat");
  const lng = position.get("lng");
  return [lat, lng];
}
