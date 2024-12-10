import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/fakeAuthContext";
import { useEffect } from "react";

function ProtectedRoutes({ children }) {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuth) navigate("/");
    },
    [isAuth, navigate]
  );
  return isAuth ? children : null;
}

export default ProtectedRoutes;
