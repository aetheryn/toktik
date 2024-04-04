import React, { useEffect, useRef, useState } from "react";
import useFetch from "../hooks/useFetch";

const Chat = (props) => {
  const [messageThread, setMessageThread] = useState([]);
  const messageRef = useRef();
  const newMessage = useFetch();

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
    convArray.reverse();
    setMessageThread(convArray);
  };

  useEffect(() => {
    console.log(props.allMessages);
    getConversation(props.allMessages);
  }, [props.selectedUser]);

  useEffect(() => {
    console.log(props.allMessages);
    getConversation(props.allMessages);
  }, [props.allMessages]);

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
      <div
        style={{
          display: "flex",
          margin: "20px",
          padding: "20px",
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

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          height: "430px",
          // maxHeight: "430px",
          padding: "20px",
          position: "relative",
        }}
      >
        <div
          style={{
            overflowY: "auto",
            padding: "10px",
          }}
        >
          {messageThread.map((message) => {
            if (message.sender_id == props.selectedUser) {
              return (
                <div style={{ display: "flex", justifyContent: "left" }}>
                  <div
                    style={{
                      backgroundColor: "#aaaaaa",
                      maxWidth: "50%",
                      textAlign: "left",
                      margin: "5px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                      paddingTop: "5px",
                      paddingBottom: "5px",
                      borderRadius: "10px",
                      color: "black",
                    }}
                  >
                    {message.content}
                  </div>{" "}
                  {/* <div> {message.created_at}</div> */}
                </div>
              );
            } else {
              return (
                <div style={{ display: "flex", justifyContent: "right" }}>
                  {/* <div style={{ alignSelf: "flex-end" }}>
                    {message.created_at}
                  </div> */}
                  <div
                    style={{
                      backgroundColor: "#eeeeee",
                      width: "auto",
                      textAlign: "right",
                      margin: "5px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                      paddingTop: "5px",
                      paddingBottom: "5px",
                      borderRadius: "10px",
                      color: "black",
                      maxWidth: "50%",
                    }}
                  >
                    {message.content}
                  </div>
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
          width: "90%",
          margin: "20px",
          justifySelf: "center",
        }}
      >
        <input
          ref={messageRef}
          onKeyDown={handleKeyDown}
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
          onClick={() => createMessage()}
          style={{
            margin: "2px",
            padding: "5px",
            backgroundColor: "#c60060",
            borderRadius: "10px",
            borderWidth: "0px",
          }}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default Chat;
