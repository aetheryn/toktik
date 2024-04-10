import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./CommentsModal.module.css";
import UserContext from "../context/user";
const Comments = (props) => {
  const [showInput, setShowInput] = useState(false);
  const userCtx = useContext(UserContext);

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

  useEffect(() => {}, [showInput]);

  return (
    <>
      <div className={styles.commentsDiv}>
        <div className={styles.mainTitle}>
          <img src={props.comments.profilePicture} className={styles.pp} />
          <div className={styles.usernameTitle}>
            <p>{props.comments.username}</p>
            <p>{props.comments.content}</p>
          </div>
        </div>
      </div>
      <p className={styles.dateTimeComments}>
        {dateConvert(props.comments.created_at)}
      </p>
      <p
        className={styles.reply}
        onClick={() => {
          setShowInput(true);
        }}
      >
        Reply
      </p>

      {showInput && (
        <>
          <form
            onSubmit={(e) => {
              setShowInput(false);
              props.handleSubmitReply(e, props.id);
            }}
          >
            <input
              className={styles.input}
              type="text"
              ref={props.commentRef}
              placeholder="comment"
              id={props.id}
            />
          </form>
        </>
      )}

      {!props.isReply &&
        (props.comments.username === userCtx.username ||
          userCtx.username === props.username) && (
          <button
            style={{
              backgroundColor: "transparent",
              borderColor: "transparent",
              color: "whitesmoke",
            }}
            onClick={() => {
              props.handleDeleteComments(props.id, props.parentId);
            }}
          >
            delete comment
          </button>
        )}

      {props.isReply &&
        (props.comments.username === userCtx.username ||
          userCtx.username === props.username) && (
          <button
            style={{
              backgroundColor: "transparent",
              borderColor: "transparent",
              color: "whitesmoke",
            }}
            onClick={() => {
              props.handleDeleteReplies(props.id, props.parentId);
            }}
          >
            delete reply
          </button>
        )}

      <div style={{ paddingLeft: 25 }}>
        {props.comments.replies?.map((item) => {
          return (
            <>
              <Comments
                handleSubmitReply={props.handleSubmitReply}
                comments={item}
                commentRef={props.commentRef}
                key={item._id}
                id={item._id}
                handleDeleteReplies={props.handleDeleteReplies}
                isReply={true}
                parentId={item.parentId}
                username={props.username}
              ></Comments>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Comments;
