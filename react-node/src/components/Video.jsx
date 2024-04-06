import React from "react";
import { Link } from "react-router-dom";
import "../components/Video.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";

const Video = (props) => {
  return (
    <>
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

        <CommentIcon
          style={{
            position: "absolute",
            right: 15,
            top: 560,
            fontSize: 28,
          }}
        ></CommentIcon>
        <div className="comments">{props.video.comments.length}</div>
        <ShareIcon
          style={{
            position: "absolute",
            right: 15,
            top: 620,
            fontSize: 28,
          }}
        ></ShareIcon>
        <video className="video-player" src={props.video.url} />
      </div>
    </>
  );
};

export default Video;
