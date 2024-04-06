import React from "react";
import styles from "./UserUpload.module.css";

const UserUpload = (props) => {
  return (
    <div>
      <video src={props.url}></video>
      <p>{props.title}</p>
    </div>
  );
};

export default UserUpload;
