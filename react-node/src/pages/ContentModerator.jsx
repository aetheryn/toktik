import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import Video from "../components/Video";
import "./ContentModerator.css";

const ContentModerator = () => {
  const fetchData = useFetch();
  const [flaggedVideos, setFlaggedVideos] = useState([]);

  // fetchData for videoes that are flagged
  const getFlaggedVideos = async () => {
    const res = await fetchData(
      "/videos/flagged/",
      "GET",
      undefined,
      undefined
    );
    if (res.ok) {
      setFlaggedVideos(res.data);
      console.log(flaggedVideos);
    }
  };
  useEffect(() => {
    getFlaggedVideos();
  }, []);

  // function for confirming video is OK

  // function for confirming flagged video

  return (
    <>
      <button>YES</button>
      <div className="flagged-videos">
        {flaggedVideos.map((video, index) => (
          <Video key={index} video={video} id={index}></Video>
        ))}
      </div>
      <button>NO</button>
    </>
  );
};

export default ContentModerator;
