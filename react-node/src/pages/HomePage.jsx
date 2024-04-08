import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import Video from "../components/Video";
import "./HomePage.css";

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  // state for reported videos
  const [reported, setReported] = useState(false);

  const getVideos = async () => {
    try {
      const res = await fetch("http://127.0.0.1:6001/videos");
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          if (data[i].reported === false) {
            setVideos(data);
          }
        }
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log(error.message);
      }
    }
  };
  useEffect(() => {
    getVideos();
    console.log(videos);
  }, []);

  // to remove the flagged video from the homepage
  // creates a new array via filter -> checks the whether the videoid sent in exists in the current array
  const handleReportChange = (videoId) => {
    setVideos(videos.filter((video) => video._id !== videoId));
  };

  return (
    <div>
      <div className="homepage">
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
