import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./DisplayFollowers.module.css";
import { Link } from "react-router-dom";

const OverLay = (props) => {
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [showLikedVideos, setShowLikedVideos] = useState(false);

  const backdrop = document.getElementById("backdrop");

  const handleClick = (event) => {
    const elements = document.getElementsByClassName("headerBtn");
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove(styles["isActive"]);
    }

    event.target.classList.add(styles["isActive"]);
  };

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

  //   backdrop.addEventListener(onClick, props.setShowModal(true));

  return (
    <div id="backdrop" className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.modalHeading}>
          <button
            className={`headerBtn ${styles.headingButton}`}
            onClick={(event) => {
              setShowFollowers(true);
              handleClick(event);
            }}
          >
            Followers
          </button>
          <button
            className={`headerBtn ${styles.headingButton}`}
            onClick={(event) => {
              setShowFollowing(true);
              handleClick(event);
            }}
          >
            Following
          </button>
          <button
            value="LikedVideos"
            className={`headerBtn ${styles.headingButton}`}
            onClick={(event) => {
              setShowLikedVideos(true);
              handleClick(event);
            }}
          >
            Likes
          </button>
        </div>
        <hr />

        {/* <div className={styles.bodyContainer}> */}
        {/* followers display */}
        {showFollowers ? (
          <div className={styles.modalDisplay}>
            <div className={styles.displayItems}>
              {props.followers.map((item) => {
                return (
                  <Link
                    to={`/profile/${item.username}`}
                    onClick={() => props.setShowModal(true)}
                    className={styles.profileNames}
                  >
                    <button className={styles.profileDiv}>
                      <img
                        className={styles.userProfilePic}
                        src={item.profilePicture}
                      />
                      <span className={styles.username}>{item.username}</span>
                    </button>
                  </Link>
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
            <div className={styles.displayItems}>
              {props.following.map((item) => {
                return (
                  <Link
                    to={`/profile/${item.username}`}
                    onClick={() => props.setShowModal(true)}
                    className={styles.profileNames}
                  >
                    <button className={styles.profileDiv}>
                      <img
                        className={styles.userProfilePic}
                        src={item.profilePicture}
                      />
                      <span className={styles.username}>{item.username}</span>
                    </button>
                  </Link>
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}

        {/* liked video display */}
        {showLikedVideos ? (
          <div className={styles.modalDisplay}>
            <ul className={styles.displayItems}> Liked Videos Placeholder </ul>
          </div>
        ) : (
          ""
        )}
        {/* </div> */}
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
