import React, { useEffect, useState } from "react";

const Chat = (props) => {
  const [messageThread, setMessageThread] = useState([]);

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
    console.log(convArray);
    setMessageThread(convArray);
  };

  useEffect(() => {
    console.log(props.allMessages);
    getConversation(props.allMessages);
  }, [props.selectedUser]);

  return (
    <div
      style={{
        display: "grid",
      }}
    >
      <div
        style={{
          display: "flex",
          margin: "20px",
          padding: "20px",
          width: "790px",
          backgroundColor: "#c60060",
          borderRadius: "20px",
        }}
      >
        <div
          style={{
            backgroundColor: "black",
            borderRadius: "50px",
            height: "50px",
            width: "50px",
          }}
        ></div>
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

      <div>
        <div
          style={{ overflow: "hidden", textAlign: "left", paddingLeft: "20px" }}
        >
          {messageThread.map((message) => {
            if (message.sender_id == props.selectedUser) {
              return (
                <div>
                  {props.selectedUser}: {message.content}{" "}
                </div>
              );
            } else {
              return (
                <div>
                  {props.loggedInUser}: {message.content}{" "}
                </div>
              );
            }
          })}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "0",
          width: "100%",
          margin: "20px",
          justifySelf: "center",
        }}
      >
        <input
          style={{
            width: "80%",
            padding: "5px",
            backgroundColor: "#333333",
            margin: "2px",
            borderRadius: "10px",
            borderWidth: "0px",
          }}
        ></input>
        <button
          style={{
            margin: "2px",
            padding: "5px",
            backgroundColor: "#c60060",
            borderRadius: "10px",
            borderWidth: "0px",
          }}
        >
          {" "}
          Submit{" "}
        </button>
      </div>
    </div>
  );
};

export default Chat;
