import React, { useContext, useEffect, useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import SocketContext from "../context/SocketContext";
import styles from "./DM.module.css";
import SendIcon from "@mui/icons-material/Send";

const Chat = (props) => {
  const [messageThread, setMessageThread] = useState([]);
  const [profilePicture, setProfilePicture] = useState("");
  const messageRef = useRef();
  const newMessage = useFetch();
  const fetchProfile = useFetch();
  const SocketCtx = useContext(SocketContext);

  const getConversation = (messages) => {
    console.log("getConversation function is called");
    const convArray = [];
    messages.map((message) => {
      if (
        message.receiver_id == props.selectedUser ||
        message.sender_id == props.selectedUser
      ) {
        convArray.push(message);
      }
    });
    console.log(convArray);
    setMessageThread(convArray);
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
    // console.log(props.allMessages);
    getConversation(props.allMessages);
    getUserProfilePic(props.selectedUser);
  }, [props.selectedUser]);

  useEffect(() => {
    // console.log(props.allMessages);
    getConversation(props.allMessages);
  }, [props.allMessages]);

  useEffect(() => {
    SocketCtx.socket.on("newMessage", handleNewMessage);
    return () => SocketCtx.socket.off("newMessage");
  }, [SocketCtx.socket, props.allMessages]);

  const handleNewMessage = () => {
    props.getAllMessages();
  };

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

      console.log(response);
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
      <div className={styles.userBanner}>
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
      </div>

      <div className={styles.chatbox}>
        <div>
          {messageThread.map((message, index) => {
            const nextMessage = messageThread[index + 1];
            const isNewDate =
              (nextMessage &&
                nextMessage.created_at.slice(0, 15) !==
                  message.created_at.slice(0, 15)) ||
              index === messageThread.length - 1;

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
                </>
              );
            }
          })}
        </div>
      </div>

      <div className={styles.bottomBanner}>
        <input ref={messageRef} onKeyDown={handleKeyDown}></input>
        <button onClick={() => createMessage()}>
          <SendIcon style={{ width: "80%" }}></SendIcon>
        </button>
      </div>
    </>
  );
};

export default Chat;
