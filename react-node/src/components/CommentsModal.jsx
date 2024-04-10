import React, { useContext, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import useFetch from "../hooks/useFetch";
import styles from "./CommentsModal.module.css";
import UserContext from "../context/user";
import Comments from "./Comments";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import FlagIcon from "@mui/icons-material/Flag";
import ShareIcon from "@mui/icons-material/Share";

const OverLay = (props) => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const [userPP, setUserPP] = useState("");
  const [comments, setComments] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [likes, setLikes] = useState([]);
  const [color, setColor] = useState("white");
  const [videoLiked, setVideoLiked] = useState(false);

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
      setLikes(res.data.likes);
      setComments(res.data.comments);
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
    }
  };

  const addReply = async (id) => {
    if (commentRef.current.value) {
      const res = await fetchData(
        "/comments/replies/" + props.id,
        "POST",
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
    }
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

  useEffect(() => {
    if (likes.includes(userCtx.username)) {
      setVideoLiked(true);
      setColor("red");
    } else {
      setColor("white");
    }
  }, [likes]);

  const handleCloseModal = () => {
    if (modalRef) {
      modalRef.current.addEventListener("click", (e) => {
        if (modalRef.current.value === e.target.value) {
          props.setShowCommentsModal(false);
        }
      });
    }
  };

  const handleSubmitReply = (e, id) => {
    e.preventDefault();
    addReply(id);
    setShowInput(false);
    commentRef.current.value = "";
  };

  const reportVideo = async (flaggedId) => {
    const res = await fetchData(
      "/videos/flagged/" + flaggedId,
      "PATCH",
      {
        reported: !reported,
      },
      undefined
    );
    if (res.ok) {
      setReported(reported);
      // to change color
      colorChange();
    }
    // to update source of truth in parent (homepage)
    props.handleReportChange(flaggedId, !reported);
  };

  const handleLikeClick = async (likeId) => {
    if (videoLiked === false) {
      const res = await fetchData(
        "/videos/likes/" + likeId,
        "PUT",
        { username: userCtx.username },
        undefined
      );

      if (res.ok) {
        console.log("am i here");
        setVideoLiked(true);
        getProfileData();
      }
    } else if (videoLiked === true) {
      const res = await fetchData(
        "/videos/likes/remove/" + likeId,
        "PUT",
        { username: userCtx.username },
        undefined
      );
      if (res.ok) {
        setVideoLiked(false);
        getProfileData();
      }
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
          <div className={styles.buttonContainer}>
            <button
              style={{
                position: "absolute",
                right: "51vw",
                bottom: "50vh",
                fontSize: "1rem",
                zIndex: 100,
                backgroundColor: "transparent",
                borderColor: "transparent",
                height: "3rem",
              }}
            >
              <FavoriteIcon
                style={{ fill: color, zIndex: 1000000 }}
                onClick={(e) => {
                  e.preventDefault();
                  handleLikeClick(props.id);
                }}
              ></FavoriteIcon>
              <p>{likes.length > 0 ? likes.length : props.likes.length}</p>
            </button>

            <button
              style={{
                position: "absolute",
                right: "51vw",
                bottom: "43vh",
                fontSize: "1rem",
                zIndex: 1000000,
                backgroundColor: "transparent",
                borderColor: "transparent",
                height: "3rem",
              }}
              onClick={() => handleCommentsClick()}
            >
              <CommentIcon></CommentIcon>
              <p>
                {comments.length > 0 ? comments.length : props.comments.length}
              </p>
            </button>

            <button
              style={{
                position: "absolute",
                right: "51vw",
                bottom: "38vh",
                fontSize: "1rem",
                backgroundColor: "transparent",
                borderColor: "transparent",
                zIndex: 1000000,
              }}
              onClick={() => ""}
            >
              <FlagIcon></FlagIcon>
            </button>

            <button
              style={{
                position: "absolute",
                right: "51vw",
                bottom: "32vh",
                fontSize: "1rem",
                backgroundColor: "transparent",
                borderColor: "transparent",
                zIndex: 1000000,
              }}
            >
              <ShareIcon></ShareIcon>
            </button>
          </div>
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
                <form onSubmit={(e) => handleSubmitComment("")}>
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
                        <Comments
                          key={item._id}
                          handleSubmitReply={handleSubmitReply}
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
          likes={props.likes}
          comments={props.comments}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default CommentsModal;
