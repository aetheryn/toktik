import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Profile from "./Profile";
import Video from "../components/Video";
import "./HomePage.css";

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  const getVideos = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_SERVER + "/videos");
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setVideos(data);
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

  return (
    <div>
      <div className="homepage">
        {videos.map((video, index) => (
          <Video key={index} video={video} id={video._id} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
