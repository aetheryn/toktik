import React, { useEffect, useState } from "react";

const Chat = (props) => {
  const [messageThread, setMessageThread] = useState([]);

  const findMessages = (messages) => {
    const tempArray = [];
    messages.map((message) => {
      if (
        message.receiver_id == props.selectedUser ||
        message.sender_id == props.selectedUser
      ) {
        tempArray.push(message);
      }
    });
    console.log(tempArray);
    setMessageThread(tempArray);
  };

  useEffect(() => {
    console.log(props.allMessages);
    findMessages(props.allMessages);
  }, [props.selectedUser]);

  return (
    <div
      style={{
        position: "absolute",
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
    </div>
  );
};

export default Chat;
