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

      {/* MODAL WHEN CLICK ON VIDEO - show video + comments (probably the same one from the homepage so we shall wait and delegate) */}
    </div>
  );
};

export default UserUpload;
