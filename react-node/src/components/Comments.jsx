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
      <div className={styles.mainTitle}>
        <img src={props.comments.profilePicture} className={styles.ppComment} />
        <div className={styles.usernameTitle}>
          <div style={{ fontWeight: "bold" }}>{props.comments.username}</div>
          <div>{props.comments.content}</div>

          <div className={styles.miscellaneous}>
            <div className={styles.dateTime}>
              {dateConvert(props.comments.created_at)}
            </div>
            <div
              className={styles.reply}
              onClick={() => {
                setShowInput(true);
              }}
            >
              Reply
            </div>

            {!props.isReply &&
              (props.comments.username === userCtx.username ||
                userCtx.username === props.username) && (
                <div
                  className={styles.reply}
                  onClick={() => {
                    props.handleDeleteComments(props.id, props.parentId);
                  }}
                >
                  Delete Comment
                </div>
              )}

            {props.isReply &&
              (props.comments.username === userCtx.username ||
                userCtx.username === props.username) && (
                <div
                  className={styles.reply}
                  onClick={() => {
                    props.handleDeleteReplies(props.id, props.parentId);
                  }}
                >
                  Delete Reply
                </div>
              )}
          </div>
        </div>
      </div>

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

      <div style={{ paddingLeft: "25", scale: "0.8" }}>
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
