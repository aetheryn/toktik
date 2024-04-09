import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../components/Video.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import FlagIcon from "@mui/icons-material/Flag";
import ShareIcon from "@mui/icons-material/Share";
import useFetch from "../hooks/useFetch";
import CommentsModal from "./CommentsModal";
import UserContext from "../context/user";
import { filledInputClasses } from "@mui/material";
import { useInView } from "react-intersection-observer";

const Video = (props) => {
  const fetchData = useFetch();
  // state to track color
  const [color, setColor] = useState("white");
  // state to track reported status
  const [reported, setReported] = useState(props.video.reported);
  // state to track number of likes
  const [liked, setLiked] = useState([]);
  // state to track whether a video has been liked
  const [videoLiked, setVideoLiked] = useState(false);

  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  const { ref, inView } = useInView({
    threshold: 0.5,
  });
  const videoRef = useRef(null);

  useEffect(() => {
    const videoThing = videoRef.current;
    if (inView) {
      videoThing.play();

      console.log("hi");
      console.log(ref);
    } else {
      videoThing.pause();
      console.log("beye");
    }
  }, [inView]);

  const handleCommentsClick = () => {
    if (userCtx.accessToken.length > 0) {
      return setShowCommentsModal(true);
    } else {
      return navigate("/login");
    }
  };

  // function to change color
  const colorChangeFavourite = () => {
    setColor((prevColor) => (prevColor === "white" ? "red" : "white"));
    console.log("change color");
  };

  const getSpecificVideo = async () => {
    const res = await fetchData(
      "/videos/getvideo/",
      "PUT",
      {
        id: props.id,
      },
      undefined
    );
    if (res.ok) {
      setLiked(res.data.likes);
      console.log(res);
    }
  };

  // function to increase like
  const handleLikeClick = async (likeId) => {
    if (videoLiked === false) {
      const res = await fetchData(
        "/videos/likes/" + likeId,
        "PUT",
        { username: userCtx.username },
        undefined
      );

      if (res.ok) {
        // renders the page again
        // props.getVideos();
        // Update the likes count in the HomePage component
        // props.updateLikes(likeId, updatedLikesCount);
        setVideoLiked(true);
        console.log("liked, counter + 1");

        getSpecificVideo();
      }
    } else if (videoLiked === true) {
      const res = await fetchData(
        "/videos/likes/remove/" + likeId,
        "PUT",
        { username: userCtx.username },
        undefined
      );
      if (res.ok) {
        setVideoLiked(false);
        console.log("idk, unliked");
        getSpecificVideo();
      }
    }
  };

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
      // to change color
      colorChange();
    }
    // to update source of truth in parent (homepage)
    props.handleReportChange(flaggedId, !reported);
  };

  useEffect(() => {}, [showCommentsModal, liked]);

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

      <div ref={ref} className="videoDisplay">
        <div className="title">{props.video.title}</div>
        <Link to={`/profile/${props.video.username}`} className="username">
          {props.video.username}
        </Link>

        <button
          style={{
            position: "absolute",
            right: "1vw",
            bottom: "32vh",
            fontSize: "1rem",
            zIndex: 100,
            backgroundColor: "transparent",
            borderColor: "transparent",
            height: "3rem",
          }}
          onClick={colorChangeFavourite}
        >
          <FavoriteIcon
            style={{ fill: color, zIndex: 1000000 }}
            onClick={(e) => {
              e.preventDefault();
              handleLikeClick(props.video._id);
            }}
          ></FavoriteIcon>
          <p>{liked.length > 0 ? liked.length : props.video.likes.length}</p>
        </button>

        <button
          style={{
            position: "absolute",
            right: "1vw",
            bottom: "24vh",
            fontSize: "1rem",
            zIndex: 1000000,
            backgroundColor: "transparent",
            borderColor: "transparent",
            height: "3rem",
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
            bottom: "18vh",
            fontSize: "1rem",
            backgroundColor: "transparent",
            borderColor: "transparent",
            zIndex: 1000000,
          }}
          onClick={() => reportVideo(props.video._id)}
        >
          <FlagIcon></FlagIcon>
        </button>

        <button
          style={{
            position: "absolute",
            right: "1vw",
            bottom: "12vh",
            fontSize: "1rem",
            backgroundColor: "transparent",
            borderColor: "transparent",
            zIndex: 1000000,
          }}
        >
          <ShareIcon></ShareIcon>
        </button>

        <video
          ref={videoRef}
          className="video-player"
          src={props.video.url}
          controls
          loop={true}
        />
      </div>
    </>
  );
};

export default Video;
