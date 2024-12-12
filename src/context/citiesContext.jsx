import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
const BASE_URL = "http://localhost:9000";

const CitiesContext = createContext();
function CitiesProvider({ children }) {
  const initialState = {
    cities: [],
    isLoding: false,
    currentCity: {},
    error: "",
  };

  function reducer(state, action) {
    switch (action.type) {
      case "loading":
        return {
          ...state,
          isLoding: true,
        };
      case "city/loaded":
        return {
          ...state,
          isLoding: false,
          currentCity: action.payload,
        };
      case "cities/loaded":
        return {
          ...state,
          isLoding: false,
          cities: action.payload,
        };
      case "cities/created":
        return {
          ...state,
          isLoding: false,
          cities: [...state.cities, action.payload],
          currentCity: action.payload,
        };

      case "city/deleted":
        return {
          ...state,
          isLoding: false,
          cities: state.cities.filter((city) => city.id !== action.payload),
        };

      case "rejected":
        return { ...state, error: action.payload, isLoding: false };
      default:
        throw new Error("Unknown type Passed");
    }
  }

  const [{ cities, isLoding, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // const [cities, setCities] = useState([]);
  // const [isLoding, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();

        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        dispatch({
          type: "rejected",
          payload: "Error while Fetching Cities data",
        });
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();

        dispatch({ type: "city/loaded", payload: data });
        //   console.log(data, "context");
      } catch (err) {
        dispatch({
          type: "rejected",
          payload: "Error while Fetching city data",
        });
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await res.json();

      dispatch({ type: "cities/created", payload: data });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "Error while Creating New city",
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });

    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id });
      // setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "Error while deleting   city",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{ cities, isLoding, getCity, currentCity, createCity, deleteCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was use outside of thr citiesprovider");
  return context;
}

export { CitiesProvider, useCities };
