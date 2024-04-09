import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import Video from "../components/Video";
import "./ContentModerator.css";
import Button from "@mui/material/Button";

const ContentModerator = (props) => {
  const fetchData = useFetch();
  const [flaggedVideos, setFlaggedVideos] = useState([]);
  const [videoStatus, setVideoStatus] = useState(false);

  // fetchData for videoes that are flagged
  const getFlaggedVideos = async () => {
    const res = await fetchData(
      "/videos/flagged/",
      "GET",
      undefined,
      undefined
    );
    if (res.ok) {
      console.log(res.data);
      setFlaggedVideos(res.data);
      console.log(flaggedVideos);
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
      undefined
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
      undefined
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
            <Video video={video} id={index}></Video>
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
    </>
  );
};

export default ContentModerator;
