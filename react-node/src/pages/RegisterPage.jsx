import React, { useState } from "react";
import styles from "./LoginPage.module.css";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const fetchData = useFetch();
  const navigate = useNavigate();

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
      console.log("res");
      navigate("/login");
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
              Already a Toktiker?
              <a href="login">
                <span className={styles.signUpText}> Login now!</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
