import React from "react";
import styles from "./UserUpload.module.css";

const UserUpload = (props) => {
  return (
    <div>
      <video className={styles.video} src={props.url} controls></video>
      <p className={styles.title}>{props.title}</p>
    </div>
  );
};

export default UserUpload;
