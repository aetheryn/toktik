import React, { useState, useEffect } from "react";
import Chat from "./Chat";

const UserinDM = (props) => {
  const [lastMessage, setLastMessage] = useState("");

  const getLastMsg = (messages) => {
    const lastMsg = messages.find(
      (message) =>
        message.receiver_id == props.user || message.sender_id == props.user
    );
    setLastMessage(lastMsg.content);
  };

  useEffect(() => {
    getLastMsg(props.allMessages);
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
        ></div>
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
