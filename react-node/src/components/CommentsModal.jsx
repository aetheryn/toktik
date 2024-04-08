import React, { useContext, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import useFetch from "../hooks/useFetch";
import styles from "./CommentsModal.module.css";
import UserContext from "../context/user";

const OverLay = (props) => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const [userPP, setUserPP] = useState("");
  const [comments, setComments] = useState([]);
  const commentRef = useRef("");
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
      setComments(res.data.comments);
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
    }
  };

  const addComments = async () => {
    const res = await fetchData(
      "/videos/comments/" + props.id,
      "PUT",
      {
        username: userCtx.username,
        profilePicture: userCtx.profilePic,
        content: commentRef.current.value,
      },
      undefined
    );
    if (res.ok) console.log("added comments");
    // need to get new comments from userDetails (based on video ID)
  };

  const handleSubmitComment = () => {
    console.log("working");
    addComments();
    commentRef.current.value = "";
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <>
      <div id="outside" className={styles.backdrop}>
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

              {/* comments */}

              <input type="text" ref={commentRef} style={{ color: "black" }} />
              <button type="submit" onClick={() => handleSubmitComment()}>
                submit
              </button>

              {comments
                ? comments.map((item) => {
                    return <p>{item.content}</p>;
                  })
                : ""}

              <button
                style={{ color: "black" }}
                onClick={() => props.setShowCommentsModal(false)}
              >
                CANCEL
              </button>
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
