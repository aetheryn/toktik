import { React, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <header className={styles.navbar}>
      <div className={`row ${styles.container}`}>
        <div className={`col ${styles.logo}`}>
          <Link to="/main">Logo</Link>
        </div>

        <div className={`col ${styles.navigation}`}>
          <div className={styles.dropdown}>
            <button className={styles.navlinks}>Profile</button>

            <div className={styles.dropdownlinks}>
              <Link to="/profile"> Profile </Link>
              <Link to="/login"> Logout </Link>
            </div>
          </div>

          <button className={styles.navlinks}>
            <Link to="/dm">DM</Link>
          </button>

          <button className={styles.navlinks}>
            <Link to="/upload">Upload</Link>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
