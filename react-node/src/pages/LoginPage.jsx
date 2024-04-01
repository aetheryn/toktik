import React from "react";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
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
              />
            </div>

            <div id="password">
              <input
                className={styles.userInput}
                type="password"
                placeholder="password"
              />
            </div>
          </div>
          <div id="login">
            <button className={styles.loginBtn} type="submit">
              Login
            </button>
          </div>
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
  );
};

export default LoginPage;
