import React from "react";

const Chat = (props) => {
  return (
    <div
      style={{
        display: "flexbox",
        position: "absolute",
        height: "100%",
        weight: "100%",
      }}
    >
      <div className="row">
        <div
          style={{
            backgroundColor: "#c60060",
            borderRadius: "50px",
            height: "50px",
            width: "50px",
          }}
        ></div>
        <div style={{ fontWeight: "700" }}>{props.user}</div>
      </div>

      <h1>{props.selectedUser}'s chat.</h1>
      <div>
        <div
          style={{ overflow: "hidden", textAlign: "left", paddingLeft: "20px" }}
        >
          {/* <div style={{ fontWeight: "700" }}>{props.user}</div>
          <div style={{ fontSize: "x-small" }}>Last text message</div> */}
        </div>
      </div>
    </div>
  );
};

export default Chat;
