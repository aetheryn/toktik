import React, { useState, useEffect, useContext } from "react";
import Chat from "./Chat";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";

const UserinDM = (props) => {
  const [lastMessage, setLastMessage] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const fetchProfile = useFetch();
  const userCtx = useContext(UserContext);

  const getLastMsg = (messages) => {
    const lastMsg = messages.find(
      (message) =>
        message.receiver_id == props.user || message.sender_id == props.user
    );
    setLastMessage(lastMsg.content);
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
  }, [props.allMessages]);

  return (
    <>
      <div
        style={{
          display: "flex",
          backgroundColor: "#c60060",
          height: "70px",
          alignItems: "center",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
        onClick={() => {
          props.handleUserSelect(props.user);
        }}
      >
        <div
          style={{
            backgroundColor: "black",
            borderRadius: "50px",
            height: "50px",
            width: "50px",
            position: "absolute",
          }}
        >
          <img
            src={profilePicture}
            alt=""
            style={{ borderRadius: "50%", height: "50px" }}
          />
        </div>

        <div
          style={{
            overflow: "hidden",
            textAlign: "left",
            paddingLeft: "60px",
            display: "grid",
          }}
        >
          <div style={{ fontWeight: "700" }}>{props.user}</div>
          <div style={{ fontSize: "x-small", overflow: "hidden" }}>
            {lastMessage}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserinDM;
