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
  const [showInput, setShowInput] = useState(false);
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
    if (res.ok) {
      getProfileData();
    }
    // need to get new comments from userDetails (based on video ID)
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    addComments();
    setShowInput(false);
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
                <img className={styles.pp} src={userPP} />
                <div className={styles.usernameTitle}>
                  <p style={{ fontWeight: "bold" }}>{props.username}</p>
                  <p>{props.title}</p>
                </div>
              </div>
              <div className={styles.bottomContainer}>
                <p className={styles.dateTimeMain}>
                  {dateConvert(props.created_at)}
                </p>
                <p
                  className={styles.reply}
                  onClick={() => {
                    setShowInput(true);
                  }}
                >
                  Reply
                </p>
              </div>

              {showInput && (
                <form onSubmit={(e) => handleSubmitComment(e)}>
                  <input
                    className={styles.input}
                    type="text"
                    ref={commentRef}
                    placeholder="comment"
                  />
                </form>
              )}
              <hr />

              {/* comments */}

              {comments
                ? comments.map((item) => {
                    return (
                      <>
                        <div className={styles.commentsDiv}>
                          <div className={styles.mainTitle}>
                            <img
                              src={item.profilePicture}
                              className={styles.pp}
                            />
                            <div className={styles.usernameTitle}>
                              <p>{item.username}</p>
                              <p>{item.content}</p>
                            </div>
                          </div>
                        </div>
                        <p className={styles.dateTimeComments}>
                          {dateConvert(item.created_at)}
                        </p>
                        <hr />
                      </>
                    );
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
