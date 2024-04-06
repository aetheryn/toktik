import React from "react";
import styles from "./UserUpload.module.css";

const UserUpload = (props) => {
  return (
    <div className="container">
      <div className="video">
        <video className={styles.video} src={props.url} controls></video>
        <div className={styles.titleContainer}>
          <p className={styles.title}>{props.title}</p>
        </div>
      </div>
    </div>
  );
};

export default UserUpload;
