import React, { useState } from "react";
import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import CommentsModal from "./CommentsModal";
import UserContext from "../context/user";
import styles from "./Video";

const Video = (props) => {
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {}, [showCommentsModal]);

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

      <div className="videoDisplay">
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

        <button
          style={{
            position: "absolute",
            right: "1vw",
            bottom: "24vh",
            fontSize: "1rem",
            backgroundColor: "transparent",
            borderColor: "transparent",
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
        >
          <FavoriteIcon></FavoriteIcon>
          <p>{props.video.likes.length}</p>
        </button>

        <button
          style={{
            position: "absolute",
            right: "1vw",
            bottom: "16vh",
            fontSize: "1rem",
            zIndex: 1000000,
            backgroundColor: "transparent",
            borderColor: "transparent",
          }}
          onClick={() => handleCommentsClick()}
        >
          <CommentIcon></CommentIcon>
          <p>{props.video.comments.length}</p>
        </button>

        <button
          style={{
            position: "absolute",
            right: "1vw",
            bottom: "13vh",
            fontSize: "1rem",
            backgroundColor: "transparent",
            borderColor: "transparent",
            zIndex: 10,
          }}
        >
          <ShareIcon></ShareIcon>
        </button>

        <video className="video-player" src={props.video.url} controls />
      </div>
    </>
  );
};

export default Video;
