import React from "react";
import styles from "./LoginPage.module.css";

const RegisterPage = () => {
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
              Sign up
            </button>
          </div>
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
  );
};

export default RegisterPage;
