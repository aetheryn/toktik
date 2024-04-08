import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../components/Video.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import CommentsModal from "./CommentsModal";
import UserContext from "../context/user";

const Video = (props) => {
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("value is changing");
  }, [showCommentsModal]);

  const handleCommentsClick = () => {
    if (userCtx.accessToken.length > 0) {
      return setShowCommentsModal(true);
    } else {
      return navigate("/login");
    }
  };

  return (
    <>
      {showCommentsModal && (
        <CommentsModal
          id={props.id}
          username={props.video.username}
          url={props.video.url}
          setShowCommentsModal={setShowCommentsModal}
          title={props.video.title}
          created_at={props.video.created_at}
          showCommentsModal={showCommentsModal}
        ></CommentsModal>
      )}

      <div className="video-display">
        <div className="title">{props.video.title}</div>
        <Link to={`/profile/${props.video.username}`} className="username">
          {props.video.username}
        </Link>
        <FavoriteIcon
          style={{
            position: "absolute",
            right: 15,
            top: 500,
            fontSize: 28,
          }}
        ></FavoriteIcon>
        <div className="likes">{props.video.likes.length}</div>

        <button
          style={{
            position: "absolute",
            right: 15,
            top: 560,
            fontSize: 28,
            zIndex: 1000000,
            backgroundColor: "transparent",
            borderColor: "transparent",
          }}
          onClick={() => handleCommentsClick()}
        >
          <CommentIcon></CommentIcon>
        </button>
        <div className="comments">{props.video.comments.length}</div>

        <ShareIcon
          style={{
            position: "absolute",
            right: 15,
            top: 620,
            fontSize: 28,
          }}
        ></ShareIcon>
        <video className="video-player" src={props.video.url} controls />
      </div>
    </>
  );
};

export default Video;
