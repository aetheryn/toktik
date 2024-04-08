import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import Video from "../components/Video";
import "./ContentModerator.css";

const ContentModerator = () => {
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
  const videoPass = async () => {
    let flaggedId = flaggedVideos[0]._id;
    console.log(flaggedId);
    const res = await fetchData(
      "/videos/flagged/" + flaggedId,
      "PATCH",
      {
        reported: false,
      },
      undefined
    );
    if (res.ok) {
      setVideoStatus(true);
      console.log(videoStatus);
    }
  };

  // function for confirming flagged video
  const videoFail = async () => {
    let flaggedId = flaggedVideos[0]._id;
    const res = await fetchData(
      "/videos/" + flaggedId,
      "DELETE",
      undefined,
      undefined
    );
    if (res.ok) {
      setVideoStatus(true);
    }
  };

  return (
    <>
      <button onClick={videoPass}>YES</button>
      <div className="flagged-videos">
        {flaggedVideos.map((video, index) => (
          <Video key={index} video={video} id={index}></Video>
        ))}
      </div>
      <button onClick={videoFail}>NO</button>
    </>
  );
};

export default ContentModerator;
