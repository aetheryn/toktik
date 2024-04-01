import React from "react";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <div id="heading title">
          <h1>TokTik</h1>
        </div>
        {/* username password 1 Login button 1  */}
        <div id="buttons seperate login usrename and password">
          <div id="username + password div">
            <div id="username"></div>
            <div id="password"></div>
          </div>
          <div id="login">
            <button type="submit">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
