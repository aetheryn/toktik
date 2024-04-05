import React from "react";
import { Link } from "react-router-dom";

const Video = (props) => {
  return (
    <>
      <li>
        <h2>{props.video.title}</h2>
        <Link to={`/profile/${props.video.username}`}>
          {props.video.username}
        </Link>
        <img src={props.video.url} />
        <video src={props.video.url} controls />
      </li>
    </>
  );
};

export default Video;
