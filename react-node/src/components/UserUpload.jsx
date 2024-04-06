import React from "react";
import styles from "./UserUpload.module.css";

const UserUpload = (props) => {
  return (
    <div className="container">
      <div className="">
        <video className={styles.video} src={props.url} controls></video>
        <p className={styles.title}>{props.title}</p>
      </div>
    </div>
  );
};

export default UserUpload;
