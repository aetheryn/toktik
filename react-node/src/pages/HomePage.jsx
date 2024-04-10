import React, { useContext, useEffect, useRef, useState } from "react";
import Video from "../components/Video";
import styles from "./HomePage.module.css";
import { useInView } from "react-intersection-observer";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();

  const getVideos = async () => {
    try {
      const res = await fetchData("/videos", "GET", undefined, undefined);
      if (res.ok) {
        console.log(res);
        // Filter videos with reported === false
        const filteredVideos = res.data.filter(
          (video) => video.reported === false
        );
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

  // Function to update the number of likes for a video
  const updateLikes = (videoId, newLikesCount) => {
    setVideos(
      // map through each video > checks if current video _id matches the videoId property
      // shallow copy the video object with new properties of likes
      videos.map((video) =>
        video._id === videoId ? { ...video, likes: newLikesCount } : video
      )
    );
  };

  return (
    <div className={styles.homepage}>
      {videos.map((video, index) => (
        <Video
          id={video._id}
          key={index}
          video={video}
          handleReportChange={handleReportChange}
          updateLikes={updateLikes}
          getVideos={getVideos}
          likes={video.likes}
          comments={video.comments}
        />
      ))}
    </div>
  );
};

export default HomePage;
