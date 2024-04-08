import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import SocketContext from "../context/SocketContext";
import styles from "./DM.module.css";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { FamilyRestroomTwoTone } from "@mui/icons-material";
import { formLabelClasses } from "@mui/material";

const Chat = (props) => {
  const [messageThread, setMessageThread] = useState([]);
  const [profilePicture, setProfilePicture] = useState("");
  const messageRef = useRef();
  const newMessage = useFetch();
  const fetchProfile = useFetch();
  const readMessages = useFetch();
  const SocketCtx = useContext(SocketContext);

  const getConversation = (messages) => {
    const convArray = [];
    messages.map((message) => {
      if (
        message.receiver_id == props.selectedUser ||
        message.sender_id == props.selectedUser
      ) {
        convArray.push(message);
      }
    });
    setMessageThread(convArray);
  };

  const updateRead = async () => {
    try {
      const response = await readMessages(
        `/messages`,
        "PATCH",
        {
          senderId: props.selectedUser,
          receiverId: props.loggedInUser,
          read: false,
        },
        undefined
      );

      console.log(response);
      if (response.ok) {
        props.getAllMessages();
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error(error.message);
      }
    }
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
    getConversation(props.allMessages);
    getUserProfilePic(props.selectedUser);
    setTimeout(updateRead, 2000);
  }, [props.selectedUser]);

  useEffect(() => {
    getConversation(props.allMessages);
    setTimeout(updateRead, 2000);
  }, [props.allMessages]);

  useEffect(() => {
    SocketCtx.socket.on("newMessage", props.handleNewMessage);
    setTimeout(updateRead, 2000);
    return () => SocketCtx.socket.off("newMessage");
  }, [SocketCtx.socket, props.allMessages]);

  const createMessage = async () => {
    try {
      const response = await newMessage(
        `/messages`,
        "PUT",
        {
          receiverId: props.selectedUser,
          senderId: props.loggedInUser,
          content: messageRef.current.value,
        },
        undefined
      );
      if (response.ok) {
        props.getAllMessages();
        messageRef.current.value = "";
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error(error.message);
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key == "Enter") {
      createMessage();
    }
  };

  return (
    <>
      <Link className={styles.userBanner} to={`/profile/${props.selectedUser}`}>
        <img className={styles.profilePic} src={profilePicture} alt="" />
        <div
          style={{
            fontWeight: "700",
            alignContent: "center",
            marginLeft: "20px",
          }}
        >
          {props.selectedUser}
        </div>
      </Link>

      <div className={styles.chatbox}>
        <div>
          {messageThread.map((message, index) => {
            const nextMessage = messageThread[index + 1];
            const isNewDate =
              (nextMessage &&
                nextMessage.created_at.slice(0, 15) !==
                  message.created_at.slice(0, 15)) ||
              index === messageThread.length - 1;
            const isUnread =
              nextMessage &&
              message.sender_id == props.selectedUser &&
              nextMessage.read !== message.read;

            if (message.sender_id == props.selectedUser) {
              return (
                <>
                  <div style={{ display: "flex", justifyContent: "left" }}>
                    <div
                      className={styles.chatbubble}
                      style={{
                        backgroundColor: "#bbbbbb",
                        textAlign: "left",
                      }}
                    >
                      {message.content}
                    </div>
                    <div className={styles.timestamp}>
                      {message.created_at.slice(16, 21)}
                    </div>
                  </div>
                  {isNewDate && (
                    <div className={styles.date}>
                      <span> {message.created_at.slice(0, 15)}</span>
                    </div>
                  )}
                  {isUnread && (
                    <div className={styles.read}>
                      <span> Unread Messages </span>
                    </div>
                  )}
                </>
              );
            } else {
              return (
                <>
                  <div style={{ display: "flex", justifyContent: "right" }}>
                    <div className={styles.timestamp}>
                      {message.created_at.slice(16, 21)}
                    </div>
                    <div
                      className={styles.chatbubble}
                      style={{
                        backgroundColor: "#eeeeee",
                        textAlign: "right",
                      }}
                    >
                      {message.content}
                    </div>
                  </div>
                  {isNewDate && (
                    <div className={styles.date}>
                      <span> {message.created_at.slice(0, 15)} </span>
                    </div>
                  )}
                  {isUnread && (
                    <div className={styles.read}>
                      <span> Unread Messages </span>
                    </div>
                  )}
                </>
              );
            }
          })}
        </div>
      </div>

      <div className={styles.bottomBanner}>
        <input ref={messageRef} onKeyDown={handleKeyDown}></input>
        <button onClick={() => createMessage()}>
          <SendRoundedIcon style={{ width: "80%" }}></SendRoundedIcon>
        </button>
      </div>
    </>
  );
};

export default Chat;
