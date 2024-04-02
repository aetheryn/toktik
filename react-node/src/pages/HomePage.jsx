import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [videos, setVideos] = useState([]);

  const getVideos = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5001/videos");
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
            <p>{video.description}</p>
            <img src={video.url} />
            <video src={video.url} controls />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
