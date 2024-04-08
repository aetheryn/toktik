import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import useFetch from "../hooks/useFetch";
import styles from "./CommentsModal.module.css";

const OverLay = (props) => {
  const fetchData = useFetch();
  const [userPP, setUserPP] = useState("");
  // need to edit date & time ( throw to gabrielle hehe )

  const dateConvert = (dateString) => {
    const isoDate = dateString;
    const date = new Date(isoDate);
    const formatDate = new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
    return formatDate;
  };

  const getProfileData = async () => {
    const res = await fetchData("/videos/getvideo", "PUT", {
      id: props.id,
    });
    if (res.ok) {
      getUserDetails();
      console.log(res);
    }
  };

  const getUserDetails = async () => {
    const res = await fetchData(
      "/users/user/" + props.username,
      "POST",
      undefined,
      undefined
    );

    if (res.ok) {
      setUserPP(res.data.profilePicture);
      console.log("done");
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <>
      <div className={styles.backdrop}>
        <div className={styles.modalContainer}>
          <video className={styles.video} src={props.url}></video>
          <div className={styles.modal}>
            <div className={styles.commentsDiv}>
              <div className={styles.mainTitle}>
                <div>
                  <img className={styles.pp} src={userPP} />
                </div>
                <div className={styles.usernameTitle}>
                  <p style={{ fontWeight: "bold" }}>{props.username}</p>
                  <p>{props.title}</p>
                </div>
              </div>
              <p className={styles.dateTimeMain}>
                {dateConvert(props.created_at)}
              </p>
              <hr />

              <button
                style={{ color: "black" }}
                onClick={() => props.setShowCommentsModal(false)}
              >
                CANCEL
              </button>
              <p>TEST: {props.id}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const CommentsModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          setShowCommentsModal={props.setShowCommentsModal}
          id={props.id}
          url={props.url}
          username={props.username}
          title={props.title}
          created_at={props.created_at}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default CommentsModal;
