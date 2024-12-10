import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const initialState = {
    user: null,
    isAuth: false,
  };
  const FAKE_USER = {
    name: "Jinal Shah",
    email: "Jinal@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
  };

  function reducer(state, action) {
    switch (action.type) {
      case "login":
        return {
          ...state,
          user: action.payload,
          isAuth: true,
        };

      case "logout":
        return {
          ...state,
          user: null,
          isAuth: false,
        };

      default:
        throw new Error("Unknown Action");
    }
  }
  const [{ user, isAuth }, dispatch] = useReducer(reducer, initialState);

  function login(email, password) {
    if (FAKE_USER.email === email && FAKE_USER.password === password)
      dispatch({ type: "login", payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ login, logout, isAuth, user }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("authContext is use outside the AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
