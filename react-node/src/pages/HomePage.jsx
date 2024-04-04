import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Profile from "./Profile";

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  const getVideos = async () => {
    try {
      const res = await fetch("http://127.0.0.1:6001/videos");
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
    console.log(videos);
  }, []);

  return (
    <div>
      <h1>Homepage</h1>
      <ul>
        {videos.map((video, index) => (
          <li key={index}>
            <h2>{video.title}</h2>
            <Link to={`/profile/${video.username}`}>{video.username}</Link>
            <img src={video.url} />
            <video src={video.url} controls />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
