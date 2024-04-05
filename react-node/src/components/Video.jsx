import React from "react";
import { Link } from "react-router-dom";
import "../components/Video.css";

const Video = (props) => {
  return (
    <>
      <div className="video-display">
        <div className="title">{props.video.title}</div>
        <Link to={`/profile/${props.video.username}`} className="username">
          {props.video.username}
        </Link>
        <video className="video-player" src={props.video.url} />
      </div>
    </>
  );
};

export default Video;
