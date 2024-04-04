import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./DisplayFollowers.module.css";
import { Link } from "react-router-dom";

const OverLay = (props) => {
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [showLikedVideos, setShowLikedVideos] = useState(false);

  useEffect(() => {
    if (showFollowers) {
      setShowFollowing(false);
      setShowLikedVideos(false);
    }
  }, [showFollowers]);

  useEffect(() => {
    if (showFollowing) {
      setShowFollowers(false);
      setShowLikedVideos(false);
    }
  }, [showFollowing]);

  useEffect(() => {
    if (showLikedVideos) {
      setShowFollowing(false);
      setShowFollowers(false);
    }
  }, [showLikedVideos]);

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
          {showFollowers ? (
            <div className={styles.modalDisplay}>
              <div className={styles.displayItems}>
                {props.followers.map((item) => {
                  return (
                    <>
                      <Link
                        to={`/profile/${item}`}
                        onClick={() => props.setShowModal(true)}
                        className={styles.profileNames}
                      >
                        {item}
                      </Link>
                    </>
                  );
                })}
              </div>
            </div>
          ) : (
            ""
          )}

          {/* following display */}
          {showFollowing ? (
            <div className={styles.modalDisplay}>
              <ul className={styles.displayItems}>
                {props.following.map((item) => {
                  return <li>{item}</li>;
                })}
              </ul>
            </div>
          ) : (
            ""
          )}

          {/* liked video display */}
          {showLikedVideos ? (
            <div className={styles.modalDisplay}>
              <ul className={styles.displayItems}>
                {" "}
                Liked Videos Placeholder{" "}
              </ul>
            </div>
          ) : (
            ""
          )}
          <div className={styles.buttonDiv}>
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
