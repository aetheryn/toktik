import React, { useEffect, useState } from "react";
import Video from "../components/Video";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [videos, setVideos] = useState([]);

  const getVideos = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_SERVER + "/videos");
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        // Filter videos with reported === false
        const filteredVideos = data.filter((video) => video.reported === false);
        // Set videos
        setVideos(filteredVideos);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    getVideos();
  }, []);

  // to remove the flagged video from the homepage
  // creates a new array via filter -> checks the whether the videoid sent in exists in the current array
  const handleReportChange = (videoId) => {
    setVideos(videos.filter((video) => video._id !== videoId));
  };

  return (
    <div>
      <div className={styles.homepage}>
        {videos.map((video, index) => (
          <Video
            key={index}
            video={video}
            id={index}
            handleReportChange={handleReportChange}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
