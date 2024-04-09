import React, { useContext, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import useFetch from "../hooks/useFetch";
import styles from "./CommentsModal.module.css";
import UserContext from "../context/user";
import Comments from "./Comments";

const OverLay = (props) => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const [userPP, setUserPP] = useState("");
  const [comments, setComments] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const commentRef = useRef("");

  const modalRef = useRef(null);

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
      console.log(comments);
      getUserDetails();
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

  const addComments = async (id) => {
    if (commentRef.current.value !== "" && props.id === id) {
      const res = await fetchData(
        "/videos/comments/" + props.id,
        "PUT",
        {
          parentId: id,
          username: userCtx.username,
          profilePicture: userCtx.profilePic,
          content: commentRef.current.value,
        },
        undefined
      );
      if (res.ok) {
        console.log(id);
        getProfileData();
      }
    } else {
      if (commentRef.current.value !== "" && id !== props.id) {
        const res = await fetchData(
          "/videos/comments/" + props.id,
          "PUT",
          {
            replies: {
              parentId: id,
              username: userCtx.username,
              profilePicture: userCtx.profilePic,
              content: commentRef.current.value,
            },
          },
          undefined
        );
        if (res.ok) {
          getProfileData();
        }
      }
    }
    // need to get new comments from userDetails (based on video ID)
  };

  const handleSubmitComment = (e, id) => {
    console.log(id);
    console.log(props.id);
    e.preventDefault();
    addComments(id);
    setShowInput(false);
    commentRef.current.value = "";
  };

  // click outside and close modal
  useEffect(() => {
    getProfileData();
    modalRef.current.value = document.querySelector("#outside");
  }, []);

  const handleCloseModal = () => {
    if (modalRef) {
      modalRef.current.addEventListener("click", (e) => {
        if (modalRef.current.value === e.target.value) {
          props.setShowCommentsModal(false);
        }
      });
    }
  };

  return (
    <>
      <div
        id="outside"
        className={styles.backdrop}
        ref={modalRef}
        onClick={() => handleCloseModal()}
      >
        <div className={styles.modalContainer}>
          <video
            className={styles.video}
            src={props.url}
            controls
            autoPlay
          ></video>
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
                <form onSubmit={(e) => handleSubmitComment(e, props.id)}>
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

              {/* {comments.map((item) => {
                if (item.parentId === props.id) {
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
                }
              })} */}

              {comments
                ? comments.map((item) => {
                    return (
                      <>
                        <Comments
                          key={item._id}
                          handleSubmitComment={handleSubmitComment}
                          comments={item}
                          commentRef={commentRef}
                          id={item._id}
                        ></Comments>{" "}
                        <hr />
                      </>
                    );
                  })
                : ""}
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
          showCommentsModal={props.showCommentsModal}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default CommentsModal;
