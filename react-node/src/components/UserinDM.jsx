import React, { useState, useEffect, useContext } from "react";
import Chat from "./Chat";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import styles from "./DM.module.css";

const UserinDM = (props) => {
  const [lastMessage, setLastMessage] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);
  const fetchProfile = useFetch();
  const userCtx = useContext(UserContext);

  const getLastMsg = (messages) => {
    const lastMsg = messages.find(
      (message) =>
        message.receiver_id == props.user || message.sender_id == props.user
    );
    setLastMessage(lastMsg.content);
  };

  const countUnreadMsgs = (messages) => {
    const messageArray = messages.filter(
      (message) => message.sender_id == props.user && message.read == false
    );
    setUnreadCount(messageArray.length);
  };

  const getUserProfilePic = async (user) => {
    try {
      const response = await fetchProfile(
        "/users/user/" + user,
        "POST",
        undefined,
        undefined
      );

      if (response.ok) {
        setProfilePicture(response.data.profilePicture);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error(error.message);
      }
    }
  };

  useEffect(() => {
    getLastMsg(props.allMessages);
    getUserProfilePic(props.user);
    countUnreadMsgs(props.allMessages);
  }, [props.allMessages]);

  return (
    <>
      <div
        className={styles.users}
        onClick={() => {
          props.handleUserSelect(props.user);
        }}
      >
        <img src={profilePicture} alt="" className={styles.profilePic} />

        <div className={styles.userDetails}>
          <div style={{ fontWeight: "700" }}>{props.user}</div>
          <div style={{ fontSize: "x-small", overflow: "hidden" }}>
            {lastMessage}
          </div>
        </div>
        {unreadCount > 0 && <div className={styles.badge}>{unreadCount}</div>}
      </div>
    </>
  );
};

export default UserinDM;
