import React, { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import Video from "../components/Video";
import "./ContentModerator.css";
import Button from "@mui/material/Button";
import UserContext from "../context/user";

const ContentModerator = () => {
  const fetchData = useFetch();
  const [flaggedVideos, setFlaggedVideos] = useState([]);
  const [videoStatus, setVideoStatus] = useState(false);
  const userCtx = useContext(UserContext);

  // fetchData for videoes that are flagged
  const getFlaggedVideos = async () => {
    const res = await fetchData(
      "/videos/flagged/",
      "GET",
      undefined,
      userCtx.accessToken
    );
    if (res.ok) {
      console.log(res.data);
      setFlaggedVideos(res.data);
    }
  };
  useEffect(() => {
    getFlaggedVideos();
  }, [videoStatus]);

  // function for confirming video is OK
  const videoPass = async (flaggedId) => {
    const res = await fetchData(
      "/videos/flagged/" + flaggedId,
      "PATCH",
      {
        reported: false,
      },
      userCtx.accessToken
    );
    if (res.ok) {
      // to toggle the state of the video
      if (videoStatus === false) {
        setVideoStatus(true);
      } else if (videoStatus === true) {
        setVideoStatus(false);
      }
    }
  };

  // function for confirming flagged video
  const videoFail = async (flaggedId) => {
    const res = await fetchData(
      "/videos/" + flaggedId,
      "DELETE",
      undefined,
      userCtx.accessToken
    );
    if (res.ok) {
      // to toggle the state of the video
      if (videoStatus === false) {
        setVideoStatus(true);
      } else if (videoStatus === true) {
        setVideoStatus(false);
      }
    }
  };

  return (
    <>
      {userCtx.role === "admin" ? (
        <div className="flagged-videos">
          {flaggedVideos.map((video, index) => (
            <div className="video-container" key={index}>
              <Button
                variant="contained"
                color="success"
                size="large"
                onClick={() => videoPass(video._id)}
              >
                SAFE
              </Button>
              <Video
                video={video}
                id={video._id}
                key={video._id}
                likes={video.likes}
                comments={video.comments}
              ></Video>
              <Button
                variant="outlined"
                color="error"
                size="large"
                onClick={() => videoFail(video._id)}
              >
                DELETE
              </Button>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ContentModerator;
