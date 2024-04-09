import React, { useState } from "react";
import styles from "./CommentsModal.module.css";

const Comments = (props) => {
  const [showInput, setShowInput] = useState(false);

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
        <form>
          <input
            className={styles.input}
            type="text"
            ref={props.commentRef}
            placeholder="comment"
            id={props.id}
          />
          <button
            onClick={(e) => props.handleSubmitComment(e, props.id)}
          ></button>
          <button onClick={() => console.log(props.id)}></button>
        </form>
      )}

      {props.comments.replies?.map((item) => {
        return (
          <Comments
            handleSubmitComment={props.handleSubmitComment}
            comments={item}
            commentRef={props.commentRef}
            key={item._id}
            id={item._id}
          />
        );
      })}
    </>
  );
};

export default Comments;
