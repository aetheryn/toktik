import React from "react";

const Chat = () => {
  return (
    <div
      className="centered"
      style={{
        display: "block",
        backgroundColor: "black",
        height: "640px",
        borderRadius: "30px",
      }}
    >
      <div className="row" style={{ padding: "30px", paddingLeft: "50px" }}>
        <div
          className="col-1"
          style={{
            backgroundColor: "#c60060",
            borderRadius: "50px",
            height: "50px",
            width: "50px",
          }}
        ></div>

        <div
          className="col-11"
          style={{
            textAlign: "left",
            fontWeight: "700",
            alignContent: "center",
          }}
        >
          Name
        </div>
      </div>

      <div>
        <h1
          style={{
            fontSize: "1em",
          }}
        >
          Direct Messages
        </h1>
      </div>
    </div>
  );
};

export default Chat;
