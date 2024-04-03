import React, { useState } from "react";
import Chat from "./Chat";

const UserinDM = (props) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          backgroundColor: "#c60060",
          height: "70px",
          alignItems: "center",
          padding: "30px",
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
          }}
        ></div>
        <div
          style={{ overflow: "hidden", textAlign: "left", paddingLeft: "20px" }}
        >
          <div style={{ fontWeight: "700" }}>{props.user}</div>
          <div style={{ fontSize: "x-small" }}>Last text message</div>
        </div>
      </div>
    </>
  );
};

export default UserinDM;
