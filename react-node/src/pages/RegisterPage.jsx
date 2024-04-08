import React, { useContext, useState } from "react";
import styles from "./LoginPage.module.css";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/user";
import { jwtDecode } from "jwt-decode";

const RegisterPage = () => {
  const fetchData = useFetch();
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    const res = await fetchData(
      "/auth/register",
      "PUT",
      { username, password },
      undefined
    );
    if (res.ok) {
      console.log("Registration successful!");
      console.log(res);
      login();
    }
  };

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
    <div className={`${styles.container} centered`}>
      <div className={styles.loginContainer}>
        <h1>TokTik</h1>

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
            <button
              className={styles.loginBtn}
              type="submit"
              onClick={register}
            >
              Sign up
            </button>
          </div>
          <div id="sign up text">
            <p className={styles.signUp}>
              Already a Toktiker?&nbsp;
              <a href="login" className={styles.signUpText}>
                Login now!
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
