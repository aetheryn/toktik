import React, { useContext, useEffect, useState } from "react";
import styles from "./Profile.module.css";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import user from "../context/user";

const Profile = () => {
  const userCtx = useContext(UserContext); // used for only display username
  const fetchData = useFetch();
  const navigate = useNavigate();

  const [following, setFollowing] = useState();
  const [followers, setFollowers] = useState();
  const [likes, setLikes] = useState();
  const [showModal, setShowModal] = useState(false);
  const [newFollow, setNewFollow] = useState("");

  // DO NOTE THAT ALL THE PROFILES, IT IS NOT USERCTX.USERNAME - IT SHOULD BE WHOEVER WE CLICKED ON - USERCTX.USERNAME IS FOR DEV PURPOSES
  const getProfileStatInfo = async () => {
    const res = await fetchData(
      "/users/user/" + userCtx.username,
      "POST",
      undefined,
      undefined
    );

    if (res.ok) {
      setFollowing(res.data.following);
      setFollowers(res.data.followers);
      setLikes(res.data.liked_videos);
      console.log(followers);
    }
  };

  const addDataToProfile = async () => {
    const res = await fetchData("/users/" + userCtx.username, "PUT", {
      followers: newFollow,
    });

    if (res.ok) {
      getProfileStatInfo();
      console.log(followers);
    }
  };

  const followProfile = () => {
    setNewFollow(userCtx.username);
    console.log(newFollow);
    addDataToProfile();
  };

  useEffect(() => {
    getProfileStatInfo();
  }, [setFollowing, setFollowers, setLikes]);

  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <div>
          <img
            className={styles.profilePicture}
            src="https://i.pravatar.cc/150?img=3"
            alt=""
          />
        </div>
        <h1>{`@${userCtx.username}`}</h1>
        <div className={styles.profileStats}>
          <div className="following">
            <h4>{following ? following.length : 0}</h4>
            <h3>following</h3>
          </div>
          <div className="followers">
            <h4>{followers ? followers.length : 0}</h4>
            <h3>followers</h3>
          </div>
          <div className="likes">
            <h4>{likes ? likes.length : 0}</h4>
            <h3>likes</h3>
          </div>
        </div>
        <div className={styles.profileButtons}>
          <div className="followBtn">
            <button className={styles.button} onClick={() => followProfile()}>
              Follow
            </button>
          </div>
          <div className="messageBtn">
            <button className={styles.button} onClick={() => navigate("/dm")}>
              Message
            </button>
          </div>
        </div>
        <div className="profileDescription">
          <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h4>
        </div>
      </div>
    </div>
  );
};

export default Profile;
