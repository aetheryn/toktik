import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./Profile.module.css";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";
import DisplayFollowers from "../components/DisplayFollowers";
import UserUpload from "../components/UserUpload";

const Profile = () => {
  const userCtx = useContext(UserContext); // used for only display username
  const fetchData = useFetch();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(true);
  const [showCommentsModal, setShowCommentsModal] = useState(false);

  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [likes, setLikes] = useState([]);
  const [profilePicture, setProfilePicture] = useState("");
  const [profileDescription, setProfileDescription] = useState("");

  const [follow, setFollow] = useState({ username: "", profilePicture: "" });
  const [unfollow, setUnfollow] = useState({
    username: "",
    profilePicture: "",
  });
  const [followStatus, setFollowStatus] = useState(false);

  const descriptionRef = useRef("");
  const [updateProfileStatus, setUpdateProfileStatus] = useState(false);

  let { currentUser } = useParams();

  const [currUser, setCurrUser] = useState({
    username: "",
    profilePicture: "",
  });

  const [userVideos, setUserVideos] = useState([]);
  const [videoIsLoading, setVideoIsLoading] = useState(false);

  // getting stats of user
  const getProfileStatInfo = async () => {
    const res = await fetchData(
      "/users/user/" + currentUser,
      "POST",
      undefined,
      undefined
    );

    if (res.ok) {
      setFollowing(res.data.following);
      setFollowers(res.data.followers);
      setLikes(res.data.liked_videos);
      setProfileDescription(res.data.description);

      // profile pic is the pic of the user they are viewing, not the users actual pic - for placeholder purposes
      setProfilePicture(res.data.profilePicture);

      setCurrUser({
        username: currentUser,
        profilePicture: res.data.profilePicture,
      });
    }
  };

  useEffect(() => {
    const checkFollowStatus = followers.map((item) => item.username);
    if (checkFollowStatus.includes(userCtx.username)) {
      setFollowStatus(true);
    }
  }, [followers]);

  // folllow
  const followProfile = async () => {
    if (userCtx.username !== currentUser) {
      const res = await fetchData(
        "/users/" + currentUser,
        "PUT",
        {
          followers: follow,
        },
        undefined
      );

      if (res.ok) {
        addFollowing();
        getProfileStatInfo();
        setFollowStatus(true);

        setFollow({ username: "", profilePicture: "" });
        console.log(follow);
      } else {
        alert("Unable to follow profile");
      }
    }
  };

  const addFollowing = async () => {
    const res = await fetchData(
      "/users/" + userCtx.username,
      "PUT",
      {
        following: currUser,
      },
      undefined
    );

    if (res.ok) {
      getProfileStatInfo();
      console.log("I am addFollowing end");
    } else {
      alert("Unable to follow profile");
    }
  };

  const handleFollow = () => {
    setFollow({
      username: userCtx.username,
      profilePicture: userCtx.profilePic,
    });
  };

  //unfollow
  const unfollowProfile = async () => {
    if (userCtx.username !== currentUser) {
      const res = await fetchData(
        "/users/rm/" + currentUser,
        "PUT",
        {
          followers: unfollow,
        },
        undefined
      );

      if (res.ok) {
        removeFollowing();
        getProfileStatInfo();
        setFollowStatus(false);

        setUnfollow({ username: "", profilePicture: "" });
        console.log("I am unfollowProfile end");
      } else {
        alert("Unable to unfollow them >: ) ");
      }
    }
  };

  const handleUnfollow = () => {
    setUnfollow({
      username: userCtx.username,
      profilePicture: userCtx.profilePic,
    });
  };

  const removeFollowing = async () => {
    const res = await fetchData(
      "/users/rm/" + userCtx.username,
      "PUT",
      {
        following: currUser,
      },
      undefined
    );

    if (res.ok) {
      getProfileStatInfo();
      console.log("I am removeFollowing end");
    } else {
      alert("Unable to follow profile");
    }
  };

  //description
  const descriptionUpdate = async () => {
    const res = await fetchData(
      "/users/description/" + userCtx.username,
      "PUT",
      {
        description: descriptionRef.current.value,
      },
      undefined
    );
    if (res.ok) {
      getProfileStatInfo();
      console.log("Sent description update");
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    descriptionUpdate();
    setUpdateProfileStatus(false);
  };

  // user uploaded videos
  const getUserVideos = async () => {
    setVideoIsLoading(true);
    const res = await fetchData(
      "/videos/" + currentUser,
      "POST",
      undefined,
      undefined
    );
    if (res.ok) {
      setUserVideos(res.data);
      console.log(userVideos);
      setVideoIsLoading(false);
    } else {
      console.log("an error has occured");
    }
  };

  useEffect(() => {
    console.log("mounted");
  }, []);

  useEffect(() => {
    getProfileStatInfo();
    getUserVideos();
  }, [currentUser]);

  useEffect(() => {
    if (unfollow.username && unfollow.profilePicture) {
      console.log(unfollow);
      unfollowProfile();
    }
  }, [unfollow]);

  useEffect(() => {
    if (follow.username && follow.profilePicture) {
      console.log(follow);
      followProfile();
    }
  }, [follow]);

  useEffect(() => {}, [showModal]);

  const handleShowModal = () => {
    setShowModal(false);
  };

  const handleMessage = () => {
    userCtx.setSelectedUser(currentUser);
    navigate("/dm");
  };

  return (
    <div className={styles.container}>
      {/* display profile stats jsx */}
      {!showModal ? (
        <DisplayFollowers
          following={following}
          followers={followers}
          setShowModal={setShowModal}
        ></DisplayFollowers>
      ) : (
        ""
      )}

      {/* profile JSX */}
      <div className={styles.profileContainer}>
        <div>
          <img className={styles.profilePicture} src={profilePicture} alt="" />
        </div>
        <h1>{`@${currentUser}`}</h1>
        <div className={styles.profileStats} onClick={() => handleShowModal()}>
          <div className="following">
            <h4>{following ? following.length : 0}</h4>
            <h3>following</h3>
          </div>
          <div className="followers">
            <h4>{followers ? followers.length : 0}</h4>
            <h3>followers</h3>
          </div>
          <div className={styles.likesStats}>
            <h4>{likes ? likes.length : 0}</h4>
            <h3>likes</h3>
          </div>
        </div>
        {/* button jsx */}
        {currentUser !== userCtx.username ? (
          <div className={styles.profileButtons}>
            {followStatus ? (
              <div className="unfollowBtn">
                <button
                  className={styles.button}
                  onClick={() => handleUnfollow()}
                >
                  Unfollow
                </button>
              </div>
            ) : (
              <div className="followBtn">
                <button
                  className={styles.button}
                  onClick={() => handleFollow()}
                >
                  Follow
                </button>
              </div>
            )}

            <div className="messageBtn">
              <button className={styles.button} onClick={() => handleMessage()}>
                Message
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
        {/* descirption jsx */}
        <div className={styles.descriptionContainer}>
          {!updateProfileStatus ? (
            <h4
              className={styles.description}
              onClick={() => {
                if (currentUser === userCtx.username) {
                  setUpdateProfileStatus(true);
                }
              }}
            >
              {profileDescription
                ? profileDescription
                : "I am a blank description"}
            </h4>
          ) : (
            <form onSubmit={(e) => handleFormSubmit(e)}>
              <input
                maxLength={50}
                autoFocus
                className={styles.descriptionInput}
                ref={descriptionRef}
                defaultValue={profileDescription}
                type="text"
                placeholder="Enter your profile description"
              />
            </form>
          )}
        </div>
        <div className={styles.userVideoContainer}>
          {userVideos.map((item) => {
            return (
              <>
                <UserUpload
                  url={item.url}
                  title={item.title}
                  id={item._id}
                  username={item.username}
                  created_at={item.created_at}
                />
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
