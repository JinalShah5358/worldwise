// import { Link } from "react-router-dom";
import PageNav from "../Components/PageNav";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import Button from "../Components/Button";
// import { Handler } from "leaflet";
import { useAuth } from "../context/fakeAuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  const { login, isAuth } = useAuth();

  const HandleLogin = (e) => {
    e.preventDefault();
    if (email && password) login(email, password);
  };

  const navigate = useNavigate();

  useEffect(
    function () {
      if (isAuth === true) navigate("/app", { replace: true });
    },
    [isAuth, navigate]
  );

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary" onClick={HandleLogin}>
            Login
          </Button>
        </div>
      </form>
    </main>
  );
}
