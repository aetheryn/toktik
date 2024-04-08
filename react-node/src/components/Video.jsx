import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../components/Video.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import FlagIcon from "@mui/icons-material/Flag";
import ShareIcon from "@mui/icons-material/Share";
import useFetch from "../hooks/useFetch";

const Video = (props) => {
  const fetchData = useFetch();
  // state to track color
  const [color, setColor] = useState("primary");
  // state to track reported status
  const [reported, setReported] = useState(props.video.reported);

  // function for report button
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
      console.log("clicked, video reported smh");
      setReported(reported);
    }

    props.handleReportChange(flaggedId, !reported);
    // to change color
    setColor((prevColor) =>
      prevColor === "primary" ? "secondary" : "primary"
    );
  };

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
            zIndex: 1600,
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

        <FlagIcon
          onClick={() => reportVideo(props.video._id)}
          style={{
            position: "absolute",
            right: 15,
            top: 620,
            fontSize: 28,
            zIndex: 1600,
            color: color,
          }}
        ></FlagIcon>

        <ShareIcon
          style={{
            position: "absolute",
            right: 15,
            top: 670,
            fontSize: 28,
          }}
        ></ShareIcon>
        <video className="video-player" src={props.video.url} />
      </div>
    </>
  );
};

export default Video;
