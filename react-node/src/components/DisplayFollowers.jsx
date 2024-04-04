import React from "react";
import ReactDOM from "react-dom";
import styles from "./DisplayFollowers.module.css";

const OverLay = (props) => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className="modalContainer">
          <div className={styles.modalHeading}>
            <button className={styles.headingButton}>
              <h1>Followers</h1>
            </button>
            <button className={styles.headingButton}>
              <h1>Following</h1>
            </button>
            <button className={styles.headingButton}>
              <h1>Liked Videos</h1>
            </button>
          </div>
          <hr />
          <button
            onClick={() => {
              props.setShowModal(true);
            }}
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};

const DisplayFollowers = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          following={props.following}
          followers={props.followers}
          setShowModal={props.setShowModal}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default DisplayFollowers;
