import React, { useContext, useState } from "react";
import styles from "./LoginPage.module.css";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import UserContext from "../context/user";

const LoginPage = () => {
  const fetchData = useFetch();
  const navigate = useNavigate();

  // useStates for login details
  const userCtx = useContext(UserContext);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await fetchData(
      "/auth/login",
      "POST",
      { username, password },
      undefined
    );
    if (res.ok) {
      userCtx.setAccessToken(res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      const decoded = jwtDecode(res.data.access);
      userCtx.setRole(decoded.role);
      userCtx.setUsername(decoded.username);
      userCtx.setProfilePic(decoded.profilePicture);

      navigate("/main");
    }
  };

  return (
    <div className={`centered ${styles.container}`}>
      <div className={styles.loginContainer}>
        <h1>TokTik</h1>

        <div id="username + password div">
          <div id="username">
            <input
              className={styles.userInput}
              type="text"
              placeholder="username"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div id="password">
            <input
              className={styles.userInput}
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div id="login">
          <button className={styles.loginBtn} type="submit" onClick={login}>
            Login
          </button>
        </div>
        <div id="sign up text">
          <p className={styles.signUp}>
            New to TokTik?&nbsp;
            <a href="register" className={styles.signUpText}>
              Sign up now!
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
