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
      const decoded = jwtDecode(res.data.access);
      userCtx.setRole(decoded.role);
      userCtx.setUsername(decoded.username);
      userCtx.setProfilePic(decoded.profilePicture);
      navigate("/main");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <div id="heading title">
          <h1 className={styles.toktikTitle}>TokTik</h1>
        </div>
        {/* username password 1 Login button 1  */}
        <div
          className={styles.inputContainer}
          id="buttons seperate login username and password"
        >
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
              New to TokTik?
              <a href="register">
                <span className={styles.signUpText}> Sign up now!</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
