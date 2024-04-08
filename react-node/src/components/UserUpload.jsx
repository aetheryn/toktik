import React, { useState } from "react";
import styles from "./UserUpload.module.css";
import CommentsModal from "./CommentsModal";

const UserUpload = (props) => {
  const [showCommentsModal, setShowCommentsModal] = useState(false);

  return (
    <>
      {showCommentsModal && (
        <CommentsModal
          id={props.id}
          url={props.url}
          setShowCommentsModal={setShowCommentsModal}
          title={props.title}
          created_at={props.created_at}
          username={props.username}
        ></CommentsModal>
      )}
      <div className="video" onClick={() => setShowCommentsModal(true)}>
        <video className={styles.video} src={props.url} controls></video>
        <div className={styles.titleContainer}>
          <p className={styles.title}>{props.title}</p>
        </div>
      </div>
      {/* MODAL WHEN CLICK ON VIDEO - show video + comments (probably the same one from the homepage so we shall wait and delegate) */}
    </>
  );
};

export default UserUpload;
