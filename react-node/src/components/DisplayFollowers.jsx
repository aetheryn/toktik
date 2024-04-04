import React from "react";
import ReactDOM from "react-dom";
import styles from "./DisplayFollowers.module.css";

const OverLay = () => {
  return <div></div>;
};

const DisplayFollowers = () => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default DisplayFollowers;
