import React, { useContext } from "react";
import styles from "./Profile.module.css";
import UserContext from "../context/user";

const Profile = () => {
  const userCtx = useContext(UserContext);

  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <div>
          <img
            className={styles.profilePicture}
            src="https://i.pravatar.cc/150?img=3"
            alt=""
          />
        </div>
        <h1>{userCtx.username}</h1>
        <div className={styles.profileStats}>
          <div className="following">
            <h4>1</h4>
            <h3>following</h3>
          </div>
          <div className="followers">
            <h4>1</h4>
            <h3>followers</h3>
          </div>
          <div className="likes">
            <h4>1</h4>
            <h3>likes</h3>
          </div>
        </div>
        <div className={styles.profileButtons}>
          <div className="followBtn">
            <button className={styles.button}>Follow</button>
          </div>
          <div className="messageBtn">
            <button className={styles.button}>Message</button>
          </div>
        </div>
        <div className="profileDescription">
          <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h4>
        </div>
      </div>
    </div>
  );
};

export default Profile;
