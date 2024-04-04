import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./DisplayFollowers.module.css";

const OverLay = (props) => {
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [showLikedVideos, setShowLikedVideos] = useState(false);

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className="modalContainer">
          <div className={styles.modalHeading}>
            <button
              className={styles.headingButton}
              onClick={() => setShowFollowers(true)}
            >
              <h1>Followers</h1>
            </button>
            <button
              className={styles.headingButton}
              onClick={() => setShowFollowing(true)}
            >
              <h1>Following</h1>
            </button>
            <button
              value="LikedVideos"
              className={styles.headingButton}
              onClick={() => setShowLikedVideos(true)}
            >
              <h1>Liked Videos</h1>
            </button>
          </div>
          <hr />

          {/* followers display */}
          <div className={styles.modalDisplay}>
            <ul className={styles.displayItems}>
              {props.followers.map((item) => {
                return <li>{item}</li>;
              })}
            </ul>
          </div>

          {/* following display */}
          <div className={styles.modalDisplay}>
            <ul className={styles.displayItems}>
              {props.following.map((item) => {
                return <li>{item}</li>;
              })}
            </ul>
          </div>

          {/* liked video display */}
          <div className={styles.modalDisplay}>
            <ul className={styles.displayItems}>
              {props.likedvideos
                ? props.likedvideos.map((item) => {
                    return <li>{item}</li>;
                  })
                : ""}
            </ul>
          </div>
          <button
            className={styles.cancelButton}
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
