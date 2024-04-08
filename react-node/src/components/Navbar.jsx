import { React, useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import UserContext from "../context/user";

const Navbar = () => {
  const userCtx = useContext(UserContext);
  const [adminView, setAdminView] = useState(false);

  useEffect(() => {}, [adminView]);

  const handleLogout = () => {
    userCtx.setaccessToken("");
    userCtx.setRole("");
    userCtx.setUsername("");
    userCtx.setProfilePic("");
  };

  return (
    <header className={styles.navbar}>
      <div className={`row ${styles.container}`}>
        <div className={`col ${styles.logo}`}>
          <Link to="/main">
            <img src="https://fontmeme.com/permalink/240402/d3d95be2d8e76c275d690618dd82def0.png" />
          </Link>
        </div>
        {userCtx.role === "user" ? (
          <div className={`col ${styles.navigation}`}>
            <div className={styles.dropdown}>
              <button className={styles.navlinks}>
                <img
                  className={styles.userProfilePic}
                  src={userCtx.profilePic}
                />
              </button>

              <div className={styles.dropdownlinks}>
                <Link to={`/profile/${userCtx.username}`}> Profile </Link>
                <Link to="/login" onClick={{ handleLogout }}>
                  Logout
                </Link>
              </div>
            </div>

            <button className={styles.navlinks}>
              <Link to="/dm">
                <span
                  className={`material-symbols-outlined ${styles.userIcon} active`}
                >
                  mail
                </span>
              </Link>
            </button>

            <button className={styles.navlinks}>
              <NavLink to="/upload">
                <span
                  id="icon"
                  className={`material-symbols-outlined ${styles.userIcon}`}
                >
                  add
                </span>
              </NavLink>
            </button>
          </div>
        ) : (
          ""
        )}

        {userCtx.accessToken.length === 0 ? (
          <div className={`col ${styles.navigation}`}>
            <button className={styles.guestProfilePic}>
              <Link to="/register">
                <span
                  className={`material-symbols-outlined ${styles.guestProfilePic}`}
                >
                  account_circle
                </span>
              </Link>
            </button>
            <button className={styles.navlinks}>
              <Link style={{ fontSize: 18, marginRight: 15 }} to="/login">
                Login / Signup
              </Link>
            </button>
          </div>
        ) : (
          ""
        )}

        {userCtx.role === "admin" && !adminView ? (
          <div className={`col ${styles.navigation}`}>
            <div className={styles.cmdropdown}>
              <button className={styles.guestProfilePic}>
                <span
                  className={`material-symbols-outlined ${styles.guestProfilePic}`}
                >
                  local_police
                </span>
                <div className={styles.cmdropdownlinks}>
                  <Link to="/login" onClick={() => handleLogout()}>
                    Logout
                  </Link>
                </div>
              </button>
            </div>
            <button className={styles.navlinks}>
              <Link onClick={() => setAdminView(true)} to="/cm">
                Content Moderator View
              </Link>
            </button>
          </div>
        ) : (
          ""
        )}
        {userCtx.role === "admin" && adminView ? (
          <div className={`col ${styles.navigation}`}>
            <div className={styles.cmdropdown}>
              <button className={styles.guestProfilePic}>
                <span
                  className={`material-symbols-outlined ${styles.guestProfilePic}`}
                >
                  local_police
                </span>
                <div className={styles.cmdropdownlinks}>
                  <Link to="/login" onClick={() => handleLogout()}>
                    Logout
                  </Link>
                </div>
              </button>
            </div>
            <button className={styles.navlinks}>
              <Link onClick={() => setAdminView(false)} to="/">
                User View
              </Link>
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </header>
  );
};

export default Navbar;
